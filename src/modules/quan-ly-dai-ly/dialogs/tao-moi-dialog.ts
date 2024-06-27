import  axios  from 'axios';
import { DealerServiceImpl, DealerService } from './../services/dealer-service';
import { Dealer } from './../models/dealer';
import { AppSetting } from '../../../appsettings/index';
import { logger } from '../logger';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController, DialogService } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { PLATFORM } from 'aurelia-pal';





@inject(DealerServiceImpl, DialogController, ValidationControllerFactory, DialogService)

export class InsertOrUpdateDealer {
  validationcontroller: ValidationController;
  constructor(
    private dealerSrv: DealerService,
    private dialogcontroller: DialogController,
    private controllerFactory: ValidationControllerFactory,
    private dialogServices: DialogService,

  ) {
    PLATFORM.moduleName('./tao-moi-dialog.ts')
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  asyncTaskMoi;
  item: any;
  allDealerAreaCategories: any;
  dealerAreaCategories: any;
  dealerAreaCategories_parent: any;
  city: any;
  private _filter: any;
  public get filter(): any {
    return this._filter;
  };
  public set filter(value: any) {
    this._filter = value;
  };

  get getTieuDe() {
    try {
      if (this.item.id) return "Cập nhật";
    } catch (error){

    }
    return "Tạo mới";
  }


  
  async activate(dto: any) {
      this.item = dto;
      console.log('viet this.item',this.item);
      this.allDealerAreaCategories = await this.getCategory('dealer_area');
      console.log('viet this.lcvCategories', this.allDealerAreaCategories)
      this.dealerAreaCategories = this.allDealerAreaCategories.filter(e => e.language == this.item.language);
      this.dealerAreaCategories_parent = this.dealerAreaCategories.filter(e => e.parent == 0);
      console.log('viet this.dealerAreaCategories_parent', this.dealerAreaCategories_parent)

      if(this.item.language == 'vn'){
        this.city= this.item.city_vn
      }else{
        this.city = this.item.city_en
      }


  
  }

  changeLang() {

    this.dealerAreaCategories = this.allDealerAreaCategories.filter(e => e.language == this.item.language);
    this.dealerAreaCategories_parent = this.dealerAreaCategories.filter(e => e.parent == 0);

  }

  getChild(parent) {
    return this.allDealerAreaCategories.filter(e => e.parent == parent.termId);
  }

  async getCategory(name) {
    let rec = await axios.get('api/WpPosts/getCategory', {
      params: { name: name }
    })
    let cat = rec.data.items;
    return cat
  }

  async getTranslation(id){
    let url = "api/WpPosts/getTermTranslation?id="+id;
     try {
         let res = await axios.get(url);

         console.log("id", id);
         console.log("res", res.data.items);
         return res.data.items;
         } catch (error) {
         console.log(error);
         return 'error';
         }
 }

  async save() {

  

    var max=0;
    if (!this.item.id) { //tạo mới

        //begin-xử lý lưu reagion, area
        let it = this.allDealerAreaCategories.find(e => e.name == this.city);
        let it_translatation_id = await this.getTranslation(it.termId);
        let it_translation = this.allDealerAreaCategories.find(e => e.termId == it_translatation_id);
        let name = it_translation.name;

        if(this.item.language == 'vn'){
          this.item.city_vn = this.city;
          this.item.city_en = name;
        }else if(this.item.language == 'en'){
          this.item.city_en = this.city;
          this.item.city_vn = name;
        }

        let parentId = it.parent
        let parent = this.allDealerAreaCategories.find(e => e.termId == parentId);
        let parent_translation_id = await this.getTranslation(parent.termId);
        let parent_translation = this.allDealerAreaCategories.find(e => e.termId == parent_translation_id);

        if(this.item.language == 'vn'){
          this.item.region_vn = parent.name;
          this.item.region_en = parent_translation.name;
        }else if(this.item.language == 'en'){
          this.item.region_en = parent.name;
          this.item.region_vn = parent_translation.name;
        }
        
        if(this.item.region_en == 'South'){
          this.item.region = 'NAM/SOUTH'
        }
        else if(this.item.region_en == 'North'){
          this.item.region = 'BẮC/NORTH'
        }
        else if(this.item.region_en == 'Central'){
          this.item.region = 'TRUNG/CENTRAL'
        }
        else if(this.item.region_en == 'West'){
          this.item.region = 'TÂY/MEKONG DELTA'
        }
        //end-xử lý lưu reagion, area

        if(this.item.dealer_type == "dsquare"){
          this.item.dealer_type_name = "D SQUARE"
        }
        else if(this.item.dealer_type == "itrucks"){
          this.item.dealer_type_name = "i-TRUCKS"
        }

        this.item.postDateGmt = new Date();
        this.item.listCategory =[];
        this.item.facebook ='';
        this.item.direction_url = '';
        this.item.map = '';

        this.item.lat = parseFloat(this.item.lat);
        this.item.long = parseFloat(this.item.long);
        





      let ds = await this.dealerSrv.GetAllDealers();
      let ids = ds.map(e => e.postId);
      console.log('viet ids', ids);
      if(ids.length){
        max = ids.reduce((a, b) => Math.max(a, b));
        console.log('viet max', max);
      }
      if (max < 100000) {
        max = 100000
      } else {
        max = max + 1;
      }
      this.item.postId = max;
    } else { //update
      this.item.postId = this.item.id;
      delete this.item.id;
    }

    

    console.log('save() item', this.item);

    let result = await this.dealerSrv.findExist(this.item.postId);
    console.log('save() result', result);
    if (result.length > 0) {
      this.item.id = result[0].id;
      await this.dealerSrv.Patch(this.item);
    } else {
      await this.dealerSrv.Post(this.item);
    }

    this.dialogcontroller.ok();

  }
   
  public runDeleteMany(ids): void {
    throw 'Not Implemented';
  }

  public runDelete(item): void { throw 'Not Implemented'; }

  public runDeleteIndex(item, index): void {
  
  }

  async runUpdate(item) {
    await this.dealerSrv.Patch(item).then(res => this.dialogcontroller.ok());
  }

  public runUpdateIndex(item, index): void {


  }

  async runCreate(item){

    await this.dealerSrv.Post(item).then(res => this.dialogcontroller.ok());
  }

  public runFilter(): void {
    throw 'Not Implemented';
  }
  private showSuccess() {
    PLATFORM.global.swal("Thành công", "Thực hiện thành công", "success");
  }
  private showError(err) {
    PLATFORM.global.swal("Không thành công", `${err}`, "error");
  }
  private showCancel() {
    PLATFORM.global.swal("Đã hủy", "Đã hủy thao tác", "warning");
  }
  private showChonPhongBan() {
    PLATFORM.global.swal("Hãy chọn Phòng ban", "trước khi thực hiện", "warning");
  }
  private confirm(cb) {
    PLATFORM.global.swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel plx!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
      function (isConfirm) {
        cb(isConfirm)
      })
  }

}

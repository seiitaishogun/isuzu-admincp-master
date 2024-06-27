import { AppSetting } from './../../../appsettings/index';
import { BannerService, BannerServiceImpl } from '../services/banner-service';
import { Banner } from '../models/banner';
import { logger } from '../logger';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController, DialogService } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { PLATFORM } from 'aurelia-pal';
import { Filter } from './../../../resources/base/filter-base';

interface ITypeCategory {
  value: string;
  name: string;
}
interface IStatusCategory {
  value: string;
  name: string;
}

@inject(BannerServiceImpl, DialogController, ValidationControllerFactory, DialogService)

export class InsertOrUpdateBanner {
  validationcontroller: ValidationController;
  constructor(
    private bannerSrv: BannerService,
    private dialogcontroller: DialogController,
    private controllerFactory: ValidationControllerFactory,
    private dialogServices: DialogService,

  ) {
    PLATFORM.moduleName('./tao-moi-dialog.ts')
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }


  listTypeCategory: ITypeCategory[] = [
    { value: 'type.truck', name: 'truck' },
    { value: 'type.pickup_suv', name: 'pickup_suv' },
    { value: 'type.all', name: 'all' }
   

  ]
  listStatusCategory: IStatusCategory[] = [
    { value: 'status.active', name: 'Active' },
    { value: 'status.private', name: 'private' },
    
   

  ]

  image_default: string = 'https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg';
  uploadLink: string = AppSetting.uploadBanners;
  asyncTaskMoi;
  item: Banner;
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
  }
   
  public runDeleteMany(ids): void {
    throw 'Not Implemented';
  }

  public runDelete(item): void { throw 'Not Implemented'; }

  public runDeleteIndex(item, index): void {
  
  }

  async runUpdate(item) {
    await this.bannerSrv.Patch(item).then(res => this.dialogcontroller.ok());
  }

  public runUpdateIndex(item, index): void {


  }

  async runCreate(item){

    await this.bannerSrv.Post(item).then(res => this.dialogcontroller.ok());
    
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

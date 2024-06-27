import { LCVService, LCVServiceImpl } from '../services/lcv-service';
import { LCV } from '../models/lcv';
import { AppSetting } from '../../../appsettings/index';
import { logger } from '../logger';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController, DialogService } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { PLATFORM } from 'aurelia-pal';
import axios from 'axios';


@inject(LCVServiceImpl, DialogController, ValidationControllerFactory, DialogService)

export class InsertOrUpdateLCV2 {
  validationcontroller: ValidationController;
  constructor(
    private lcvSrv: LCVService,
    private dialogcontroller: DialogController,
    private controllerFactory: ValidationControllerFactory,
    private dialogServices: DialogService,

  ) {
    PLATFORM.moduleName('./chinh-sua-dialog.ts')
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  asyncTaskMoi;
  item: any;
  lcvCategories: any;
  image_default: string = 'https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg';
  uploadLink: string = AppSetting.uploadImages;
  uploadFile: string = AppSetting.uploadFiles;
  ckconfig_note = {
    extraPlugins: 'uploadimage,customupload',
    height: '100px',
    uploadUrl: this.uploadLink,
    downloadUrl: AppSetting.DownloadPath
  }
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


  async getCategory(name, language) {
    let rec = await axios.get('api/WpPosts/getCategory', {
      params: { name: name }
    })
    let cat = rec.data.items;
    // return cat.filter(e => e.language == language)
    return cat; // LCV categories không phân biệt ngôn ngữ.
  }
  async activate(dto: any) {
      this.item = dto;
      console.log('viet this.item',this.item)

      this.lcvCategories = await this.getCategory('lcv_cat', this.item.language);
      console.log('viet this.lcvCategories', this.lcvCategories)
 
  }
   
  public runDeleteMany(ids): void {
    throw 'Not Implemented';
  }

  public runDelete(item): void { throw 'Not Implemented'; }

  public runDeleteIndex(item, index): void {
  
  }
  async save() {
    await this.lcvSrv.Patch(this.item);
    this.dialogcontroller.ok();
}
  async runUpdate(item) {
    await this.lcvSrv.Patch(item).then(res => this.dialogcontroller.ok());
  }

  public runUpdateIndex(item, index): void {


  }

  async runCreate(item){

    await this.lcvSrv.Post(item).then(res => this.dialogcontroller.ok());
  }

 

  runDelete_Specification(index){
    this.item.specification.section.splice(index,1);  
  }
  runCreate_Specification(){
    let it = { title: '', content:''};
    this.item.specification.section.push(it)
  }


  runDelete_Exterior(index){
    this.item.exterior.slider.splice(index,1);  
  }
  runCreate_Exterior(){
    let it = { caption: '', image:''};
    this.item.exterior.slider.push(it)
  }

  runDelete_Interior(index){
    this.item.interior.slider.splice(index,1);  
  }
  runCreate_Interior(){
    let it = { caption: '', image:''};
    this.item.interior.slider.push(it)
  }

  runDelete_Performance(index){
    this.item.performance.slider.splice(index,1);  
  }
  runCreate_Performance(){
    let it = { caption: '', image:''};
    this.item.performance.slider.push(it)
  }

  runDelete_Safety(index){
    this.item.safety.slider.splice(index,1);  
  }
  runCreate_Safety(){
    let it = { caption: '', image:''};
    this.item.safety.slider.push(it)
  }

  runDelete_Gallery_Video(index){
    this.item.gallery.gallery_video.splice(index,1);  
  }
  runCreate_Gallery_Video(){
    let it = { caption: '', video_link:''};
    this.item.gallery.gallery_video.push(it)
  }

  runDelete_Gallery_Image(index){
    this.item.gallery.gallery_image.splice(index,1);  
  }
  runCreate_Gallery_Image(){
    let it = { caption: '', image:''};
    this.item.gallery.gallery_image.push(it)
  }

  runDelete_List_Color(index){
    this.item.list_color.section.splice(index,1);  
  }
  runCreate_List_Color(){
    let it = { color_image: '', color_name:'',list_image:[''],list_image_mobile:['']};
    this.item.list_color.section.push(it)
  }
  runDelete_List_Color_List_Image(index, index2){
    this.item.list_color.section[index].list_image.splice(index2,1);  
  }
  runCreate_List_Color_List_Image(index){
    let it = '';
    this.item.list_color.section[index].list_image.push(it);
  }
  runDelete_List_Color_List_Image_Mobile(index, index2){
    this.item.list_color.section[index].list_image_mobile.splice(index2,1);  
  }
  runCreate_List_Color_List_Image_Mobile(index){
    let it = '';
    this.item.list_color.section[index].list_image_mobile.push(it);
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

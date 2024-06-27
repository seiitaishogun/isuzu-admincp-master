import { TruckService, TruckServiceImpl } from '../services/truck-service';
import { Truck } from '../models/truck';
import { AppSetting } from '../../../appsettings/index';
import { logger } from '../logger';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController, DialogService } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { PLATFORM } from 'aurelia-pal';
import axios from 'axios';


@inject(TruckServiceImpl, DialogController, ValidationControllerFactory, DialogService)

export class InsertOrUpdateTruck2 {
  validationcontroller: ValidationController;
  constructor(
    private truckSrv: TruckService,
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
  truckCategories: any;
  truckCategories_parent: any;
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

  truck_status: boolean = false;

  get getTieuDe() {
    try {
      if (this.item.id) return "Cập nhật";
    } catch (error) {

    }
    return "Tạo mới";
  }



  async activate(dto: any) {
    this.item = dto;
    console.log('viet this.item', this.item)
    this.truckCategories = await this.getCategory('truck_cat', this.item.language);
    console.log('viet this.truckCategories', this.truckCategories)
    this.truckCategories_parent = this.truckCategories.filter(e => e.parent == 0);
    console.log('viet this.truckCategories_parent', this.truckCategories_parent)

    this.truck_status = this.getCommingSoonStatus(this.item.truck_status);
  }

  getCommingSoonStatus(itemTruckStatus: string): boolean {
    return itemTruckStatus.length === 0 ? false : true;
  }

  setCommingSoonStatus(truckStatus: boolean): string {
    return truckStatus ? "Coming soon" : "";
  }

  getChild(parent) {
    return this.truckCategories.filter(e => e.parent == parent.termId);
  }

  async getCategory(name, language) {
    let rec = await axios.get('api/WpPosts/getCategory', {
      params: { name: name }
    })
    let cat = rec.data.items;
    return cat.filter(e => e.language == language)
  }

  async save() {
    await this.truckSrv.Patch(this.item);
    this.dialogcontroller.ok();
}

  public runDeleteMany(ids): void {
    throw 'Not Implemented';
  }

  public runDelete(item): void { throw 'Not Implemented'; }

  public runDeleteIndex(item, index): void {

  }

  async runUpdate(item) {
    await this.truckSrv.Patch(item).then(res => this.dialogcontroller.ok());
  }

  public runUpdateIndex(item, index): void {


  }

  async runCreate(item) {

    await this.truckSrv.Post(item).then(res => this.dialogcontroller.ok());
  }

  runDelete_Short_Overview(index){
    this.item.list_overview.splice(index,1);  
  }
  runCreate_Short_Overview(){
    let it = { title: '', detail:''};
    this.item.list_overview.push(it)
  }
  runDelete_Engine(index){
    this.item.engine.splice(index,1);  
  }
  runCreate_Engine(){
    let it = { image: '', caption:''};
    this.item.engine.push(it)
  }

  runDelete_Performance(index){
    this.item.performance.splice(index,1);  
  }
  runCreate_Performance(){
    let it = { image: '', caption:''};
    this.item.performance.push(it)
  }

  runDelete_Exterior(index){
    this.item.exterior.splice(index,1);  
  }
  runCreate_Exterior(){
    let it = { image: '', caption:''};
    this.item.exterior.push(it)
  }

  runDelete_Interior(index){
    this.item.interior.splice(index,1);  
  }
  runCreate_Interior(){
    let it = { image: '', caption:''};
    this.item.interior.push(it)
  }

  runDelete_Specification(index){
    this.item.specification.splice(index,1);  
  }
  runCreate_Specification(){
    let it = { title: '', content:''};
    this.item.specification.push(it)
  }
  runDelete_Gallery(index){
    this.item.gallery.splice(index,1);  
  }
  runCreate_Gallery(){
    let it = { image: '', video:''};
    this.item.gallery.push(it)
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

import { Notify } from './../../../resources/base/notify';
import { WarrantyService } from './../services/warranty.service';
import { PLATFORM } from 'aurelia-pal';
import { DialogController, DialogService } from "aurelia-dialog";
import { inject } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory } from "aurelia-validation";
import { AppSetting } from '../../../appsettings/index';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';

@inject(DialogController, ValidationControllerFactory, DialogService, WarrantyService)
export class UpdateWarrantyDialog {
  validationcontroller: ValidationController;
  constructor(
    private dialogcontroller: DialogController,
    private controllerFactory: ValidationControllerFactory,
    private dialogServices: DialogService,
    private WarrantySer: WarrantyService) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }

  asyncTaskMoi;
  item: any;

  image_default: string = 'https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg';

  uploadLink: string = AppSetting.uploadImages;
  uploadFile: string = AppSetting.uploadFiles;

  ckconfig = {
    extraPlugins: 'uploadimage,customupload',
    height: '500px',
    uploadUrl: this.uploadLink,
    downloadUrl: AppSetting.DownloadPath
  }

  get getTieuDe() {
    if (this.item.id) return "Cập nhật";
    return "Tạo mới";
  }

  async activate(dto: any) {
    PLATFORM.moduleName('./update-warranty-dialog.ts');
    this.item = dto;
    console.log('this.item', this.item);
  }

  async save() {
    try {
      await this.WarrantySer.Patch(this.item);
      this.dialogcontroller.ok();
    } catch (error) {
      Notify.alertError(error);
    }
  }

}

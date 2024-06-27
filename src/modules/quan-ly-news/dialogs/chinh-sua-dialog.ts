import { NEWSServices } from '../services/news-service';
import { DialogController, DialogService } from "aurelia-dialog";
import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { ValidationController, ValidationControllerFactory } from "aurelia-validation";
import axios from 'axios';
import { AppSetting } from '../../../appsettings/index';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';

@inject(NEWSServices, DialogController, ValidationControllerFactory, DialogService)
export class InsertOrUpdateNEWS2 {
  validationcontroller: ValidationController;
  constructor(
    private newsSrv: NEWSServices,
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

  newsType: any;
  newsCategories: any;

  image_default: string = 'https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg';
  uploadLink: string = AppSetting.uploadImages;
  uploadFile: string = AppSetting.uploadFiles;
  ckconfig_note = {
    extraPlugins: 'uploadimage,customupload',
    height: '600px',
    uploadUrl: this.uploadLink,
    downloadUrl: AppSetting.DownloadPath
  }

  get getTieuDe() {
    try {
      if (this.item.id) return "Cập nhật";
    } catch (error) {

    }
    return "Tạo mới";
  }

  async activate(dto: any) {
    this.item = dto;

    // init listCategoryId when create()
    this.item.listCategoryId = this.item.listCategoryId || []; 
    
    console.log('viet this.item', this.item);
    console.log('viet this.item.listCategoryId', this.item.listCategoryId);


    [this.newsType, this.newsCategories] = await Promise.all([this.getCategory('news_type', this.item.language), this.getCategory('news_cat', this.item.language)]);
    console.log('viet this.newsType', this.newsType);
    console.log('activate() this.newsCategories', this.newsCategories);
  }

  async getCategory(name, language) {
    let rec = await axios.get('api/WpPosts/getCategory', {
      params: { name: name }
    })
    let cat = rec.data.items;
    return cat.filter(e => e.language == language)
  }



  async save() {
      await this.newsSrv.Patch(this.item);
      this.dialogcontroller.ok();
  }

}

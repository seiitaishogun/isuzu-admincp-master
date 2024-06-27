import { SPV } from '../models/spv';
import { Notify } from '../../../resources/base/notify';
import { SPVService, SPVServiceImpl } from '../services/spv-service';
import { AppSetting } from '../../../appsettings/index';
import { logger } from '../logger';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController, DialogService } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { PLATFORM } from 'aurelia-pal';
import axios from 'axios';


@inject(SPVServiceImpl, DialogController, ValidationControllerFactory, DialogService)

export class InsertOrUpdateSPV2 {
  validationcontroller: ValidationController;
  constructor(
    private spvSrv: SPVService,
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

  allSpvCategories: Object[];

  spvCategories: Object[];
  spvCategories_level_0: Object[];
  spvCategories_level_1: Object[];
  spvCategories_level_2: Object[];

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
    } catch (error) {

    }
    return "Tạo mới";
  }
  language: string = "";

  async activate(dto: any) {
    this.item = dto;
    console.log('viet this.item', this.item);

    this.allSpvCategories = await this.getCategory('spv_cat');
    console.log('viet this.truckCategories', this.allSpvCategories)

    // // init lang = vi
    this.spvCategories = this.allSpvCategories.filter(v => v["language"] === 'vn');

    this.spvCategories_level_0 = this.spvCategories.filter(e => e["parent"] == 0);
    console.log('viet this.truckCategories_parent', this.spvCategories_level_0)

    this.getSPVCategories_level_1(this.item.spv_cat_level_0);
    this.getSPVCategories_level_2(this.item.spv_cat_level_1);
  }

  changeLang(type) {
    console.log('changeLang(type)', type);

    // // init lang = vi
    this.spvCategories = this.allSpvCategories.filter(v => v["language"] === type);

    this.spvCategories_level_0 = this.spvCategories.filter(e => e["parent"] == 0);
    console.log('viet this.truckCategories_parent', this.spvCategories_level_0)

  }

  getSPVCategories_level_1(name) {
    let parent = this.spvCategories.find(e => e["name"] == name);
    this.spvCategories_level_1 = parent && this.spvCategories.filter(e => e["parent"] == parent["termId"]);
  }

  getSPVCategories_level_2(name) {
    let parent = this.spvCategories.find(e => e["name"] == name);
    this.spvCategories_level_2 = parent && this.spvCategories.filter(e => e["parent"] == parent["termId"]);
  }

  async getCategory(name): Promise<any[]> {
    let rec = await axios.get('api/WpPosts/getCategory', {
      params: { name: name }
    })

    // console.log('getCategory rec', rec);
    return rec.data.items;

    // let cat = rec.data.items;
    // return cat.filter(e => e.language == language)
  }

async save() {
    await this.spvSrv.Patch(this.item);
    this.dialogcontroller.ok();
}

  runDelete_spv_detail_gallery(index){
    this.item.spv_detail.gallery.splice(index,1);  
  }
  runCreate_spv_detail_gallery(){
    let it = '';
    this.item.spv_detail.gallery.push(it)
  }

}

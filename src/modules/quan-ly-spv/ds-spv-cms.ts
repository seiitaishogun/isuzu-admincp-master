import { InsertOrUpdateSPV2 } from './dialogs/chinh-sua-dialog';
import { Notify } from './../../resources/base/notify';
import { InsertOrUpdateSPV } from './dialogs/tao-moi-dialog';
import { SPV } from './models/spv';
import {SPVService, SPVServiceImpl } from './services/spv-service';
import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { DialogService } from "aurelia-dialog";

@inject (SPVServiceImpl,DialogService, AuthenService)
export class ManHinhSPVCMS implements ViewModelBase {
  items: SPV[];
  itemsCount: number;
  selectedItem: SPV;
  selectedList: SPV[];
  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {} };
  asyncTask: any;

  constructor(
    private spvSrv: SPVService,
    private dialogService: DialogService,
    private authSrv: AuthenService) {
    
  }

  async activate(params, routeConfig, navigationInstruction) {
    await this.runFilter()
  }

  async paginationChanged(event) {
    await this.runFilter()
  }

  async runFilter() {

    // if (typeof this.filter.where["phongBanId"] != undefined && this.filter.where["phongBanId"] == -1)
    //   delete this.filter.where["phongBanId"];

    // if (typeof this.filter.where["khachHangId"] != undefined && this.filter.where["khachHangId"] == -1)
    //   delete this.filter.where["khachHangId"];
      console.log('viet this.filter',this.filter)
      await (this.asyncTask = Promise.all([
        this.spvSrv.GetAllSPVs(this.filter).then(rec => { this.items = rec }),
        // this.spvSrv.GetAll(this.filter).then(rec => { this.itemsCount = rec.length })
      ]))
      console.log('viet dsspv',this.items)

  }


  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateSPV2, model: this.selectedItem }).whenClosed((result) => {
      if (!result.wasCancelled) {
        this.runFilter()
      } else {
        console.log("Cancel");
      }
    });
  }
 
  async runView(item) {
  
  }
  async runCreate() {
    this.selectedItem = new SPV();
    this.dialogService.open({ viewModel: InsertOrUpdateSPV, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.runFilter()
        } else {
            console.log("Cancel");
        }
    });
  }

  runDelete(item): void {
    Notify.alertConfirm(result => {
      if (result) {
        this.spvSrv.Delete(item.id).then(rs => this.runFilter());
      } else {
      }
    })
  }

  

  // async runDelete(item) {
  //   throw new Error("Method not implemented.");
  // }

  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }
}

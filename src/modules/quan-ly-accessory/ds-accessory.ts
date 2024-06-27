import { InsertOrUpdateAccessory } from './dialogs/tao-moi-dialog';
import { Accessory } from './models/accessory';
import {AccessoryService, AccessoryServiceImpl } from './services/accessory-service';
import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { DialogService } from "aurelia-dialog";
import { Notify } from './../../resources/base/notify';


@inject (AccessoryServiceImpl,DialogService, AuthenService)
export class ManHinhAccessory implements ViewModelBase {
  items: any[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {} };
  asyncTask: any;

  constructor(
    private accessorySrv: AccessoryService,
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

      await (this.asyncTask = Promise.all([
        this.accessorySrv.GetAll(this.filter).then(rec => { this.items = rec }),
        this.accessorySrv.GetCount(this.filter).then(rec => { this.itemsCount = rec })
      ]))
      console.log('viet dsaccessory',this.items)

  }


  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateAccessory, model: this.selectedItem }).whenClosed((result) => {
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
    this.selectedItem = new Accessory();
    this.dialogService.open({ viewModel: InsertOrUpdateAccessory, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.runFilter()
        } else {
            console.log("Cancel");
        }
    });
  }

  runDelete(id: number): void {
    Notify.alertConfirm(result => {
      if (result) {
        this.accessorySrv.Delete(id).then(rs => this.runFilter());
      } else {

      }
    })
  }

  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }
}

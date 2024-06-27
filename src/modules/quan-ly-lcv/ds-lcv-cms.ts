import { Notify } from './../../resources/base/notify';
import { InsertOrUpdateLCV2 } from './dialogs/chinh-sua-dialog';
import { InsertOrUpdateLCV } from './dialogs/tao-moi-dialog';
import { LCV } from './models/lcv';
import {LCVService, LCVServiceImpl } from './services/lcv-service';
import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { DialogService } from "aurelia-dialog";

@inject (LCVServiceImpl,DialogService, AuthenService)
export class ManHinhLCVCMS implements ViewModelBase {
  items: any[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  // filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {postId: {gte: 100000}}}
  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {postId: {gte: 0}}}
  asyncTask: any;

  constructor(
    private lcvSrv: LCVService,
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

    this.items = await this.lcvSrv.GetAllLCVs(this.filter);
    this.itemsCount = await this.lcvSrv.GetCount(this.filter);

  }


  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateLCV2, model: this.selectedItem }).whenClosed((result) => {
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
    this.selectedItem = new LCV();
    this.selectedItem.postStatus = "publish";
    this.selectedItem.language = "vn";
    this.dialogService.open({ viewModel: InsertOrUpdateLCV, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.runFilter()
        } else {
            console.log("Cancel");
        }
    });
  }

  // async runDelete(item) {
  //   throw new Error("Method not implemented.");
  // }
  runDelete(item): void {
    Notify.alertConfirm(result => {
      if (result) {
        this.lcvSrv.Delete(item.id).then(rs => this.runFilter());
      } else {
      }
    })
  }

  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }
}

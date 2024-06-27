import { Notify } from './../../resources/base/notify';
import { InsertOrUpdateDealer2 } from './dialogs/chinh-sua-dialog';
import { InsertOrUpdateDealer } from './dialogs/tao-moi-dialog';
import { Dealer } from './models/dealer';
import {DealerService, DealerServiceImpl } from './services/dealer-service';
import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { DialogService } from "aurelia-dialog";

@inject (DealerServiceImpl,DialogService, AuthenService)
export class ManHinhDealerCMS implements ViewModelBase {
  items: any[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  // filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {postId: {gte: 100000}}}
  filter: Filter = { order: "postTitle ASC", skip: 0, limit: 10, where: {postId: {gte: 0}}}
  asyncTask: any;

  constructor(
    private dealerSrv: DealerService,
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
    [this.items, this.itemsCount] = await Promise.all([
      this.dealerSrv.GetAllDealers(this.filter),
      this.dealerSrv.GetCount(this.filter),
    ]);
  }


  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateDealer2, model: this.selectedItem }).whenClosed((result) => {
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
    this.selectedItem = new Dealer();
    this.dialogService.open({ viewModel: InsertOrUpdateDealer, model: this.selectedItem }).whenClosed((result) => {
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
        this.dealerSrv.Delete(item.id).then(rs => this.runFilter());
      } else {
      }
    })
  }
  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }
}

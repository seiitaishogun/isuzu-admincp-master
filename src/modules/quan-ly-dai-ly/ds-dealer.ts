import { Notify } from './../../resources/base/notify';
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
export class ManHinhDealer implements ViewModelBase {
  items: any[];
  items2: any[] =[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  filter: Filter = { order: "postTitle ASC", skip: 0, limit: 10, where: {} };
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

    // if (typeof this.filter.where["phongBanId"] != undefined && this.filter.where["phongBanId"] == -1)
    //   delete this.filter.where["phongBanId"];

    // if (typeof this.filter.where["khachHangId"] != undefined && this.filter.where["khachHangId"] == -1)
    //   delete this.filter.where["khachHangId"];

      await (this.asyncTask = Promise.all([
        this.dealerSrv.GetAll(this.filter).then(rec => { this.items = rec }),
        this.dealerSrv.GetCount(this.filter).then(rec => { this.itemsCount = rec })
      ]))
      console.log('viet dsdealer',this.items)

      let ids = this.items.map(e => e.id);

      let filter2: Filter = { where: { postId : {inq: ids}}};
      let itemAppPost = await this.dealerSrv.GetAllDealers(filter2);
      console.log('viet itemAppPost',itemAppPost)

      for(let i=0;i<itemAppPost.length;i++){
        for(let j=0;j<this.items.length;j++){
          if(this.items[j].id == itemAppPost[i].postId && this.items[j].postStatus ==  itemAppPost[i].postStatus ){
            console.log('viet true');
            itemAppPost[i].id =  itemAppPost[i].postId;
            delete itemAppPost[i].postId; 
            this.items[j] = itemAppPost[i];
          }
        }
      }
      this.items2 = this.items;

  }


  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateDealer, model: this.selectedItem }).whenClosed((result) => {
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

  async runDelete(item) {
    throw new Error("Method not implemented.");
  }

  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }

  async resyncData(item) {
    try {
      // sync data from wordpress cms
      if (!item) {
        throw new Error("Dealer not found!");
      }
      const filter: Filter = {
        where: { postTitle: item.postTitle, language: "en" },
      };
      const findDealer = await this.dealerSrv.GetAll(filter);
      if (findDealer && findDealer.length > 0) {
        const titleAlert = `Dealer '${item.postTitle}' đã tồn tại`;
        Notify.alertMessageConfirm(async (cb: boolean) => {
          if (cb) {
            const { id, ...data } = item;
            await this.dealerSrv.Post(data);
            Notify.alertSuccess();
          }
        }, titleAlert)
      } else {
        const { id, ...data } = item;
        await this.dealerSrv.Post(data);
        Notify.alertSuccess();
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

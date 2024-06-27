import { InsertOrUpdateContact } from './dialogs/tao-moi-dialog';
import { Contact } from './models/contact';
import {ContactService, ContactServiceImpl } from './services/contact-service';
import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { DialogService } from "aurelia-dialog";
import { Notify } from './../../resources/base/notify';

@inject (ContactServiceImpl,DialogService, AuthenService)
export class ManHinhContact implements ViewModelBase {
  items: any[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {} };
  asyncTask: any;

  constructor(
    private contactSrv: ContactService,
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
        this.contactSrv.GetAll(this.filter).then(rec => { this.items = rec }),
        this.contactSrv.GetCount(this.filter).then(rec => { this.itemsCount = rec })
      ]))
      console.log('viet dscontact',this.items)

  }


  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateContact, model: this.selectedItem }).whenClosed((result) => {
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
    this.selectedItem = new Contact();
    this.dialogService.open({ viewModel: InsertOrUpdateContact, model: this.selectedItem }).whenClosed((result) => {
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
        this.contactSrv.Delete(id).then(rs => this.runFilter());
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

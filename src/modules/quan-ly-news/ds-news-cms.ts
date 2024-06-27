import { NEWSServices } from './services/news-service';
import { InsertOrUpdateNEWS } from './dialogs/tao-moi-dialog';
import { InsertOrUpdateNEWS2 } from './dialogs/chinh-sua-dialog';
import { NEWS } from './models/news';
import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { DialogService } from "aurelia-dialog";
import { Notify } from './../../resources/base/notify';

@inject (NEWSServices,DialogService, AuthenService)
export class ManHinhNEWSCMS implements ViewModelBase {
  items: any[];
  items2: any[] =[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  // filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {postId: {gte: 100000}}}
  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {postId: {gte: 0}}}

  asyncTask: any;

  constructor(
    private newsSrv: NEWSServices,
    private dialogService: DialogService,
    private authSrv: AuthenService) {
    
  }

  async activate(params, routeConfig, navigationInstruction) {
    await this.runFilter();
  }

  async paginationChanged(event) {
    await this.runFilter()
  }
 


  async runFilter() {
      this.items = await this.newsSrv.GetAllNews(this.filter);
      this.itemsCount = await this.newsSrv.GetCount(this.filter);
  }


  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateNEWS2, model: this.selectedItem }).whenClosed(async (result) => {
      if (!result.wasCancelled) {
         this.runFilter();
      } else {
        console.log("Cancel");
      }
    });
  }
 
  async runView(item) {
  
  }
  async runCreate() {
    this.selectedItem = new NEWS();
 
    this.selectedItem.postStatus = "publish";
    this.selectedItem.language = "vn";

    this.dialogService.open({ viewModel: InsertOrUpdateNEWS, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.runFilter();
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
        this.newsSrv.Delete(item.id).then(rs => this.runFilter());
      } else {
      }
    })
  }

  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }
}

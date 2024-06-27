import { NEWSServices } from './services/news-service';
import { InsertOrUpdateNEWS } from './dialogs/tao-moi-dialog';
import { NEWS } from './models/news';
import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { DialogService } from "aurelia-dialog";

@inject (NEWSServices,DialogService, AuthenService)
export class ManHinhNEWS implements ViewModelBase {
  items: any[];
  items2: any[] =[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {} };

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

      console.log('viet this.filter',this.filter)
      
      await (this.asyncTask = Promise.all([
        this.newsSrv.GetAll(this.filter).then(rec => { this.items = rec }),
        // this.newsSrv.GetCount(this.filter).then(rec => { this.itemsCount = rec })
      ]))
      console.log('viet dsnews',this.items)

      let ids = this.items.map(e => e.id);

      let filter2: Filter = { where: { postId : {inq: ids}}};
      let itemAppPost = await this.newsSrv.GetAllNews(filter2);
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
      // let filter3: Filter = { order: "id desc", where: {postId: {gte: 100000}, postStatus: "publish"}}
      // this.items3 = await this.newsSrv.GetAllNews(filter3);


  


     

  }
 

  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrUpdateNEWS, model: this.selectedItem }).whenClosed(async (result) => {
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

  async runDelete(item) {
    throw new Error("Method not implemented.");
  }

  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }
}

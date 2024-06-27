import { AuthenService } from '../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { logger } from "./logger";
import { DialogService } from "aurelia-dialog";

@inject (DialogService, AuthenService)
export class ManHinhMau implements ViewModelBase {
  items: any[];
  itemsCount: number;
  selectedItem: any;
  selectedList: any[];
  filter: Filter;

  constructor(
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
    
  }

  async runUpdate(item) {
   
  }
 
  async runView(item) {
  
  }
  async runCreate(item) {
  
  }

  async runDelete(item) {
    throw new Error("Method not implemented.");
  }

  async runDeleteMany() {
    throw new Error("Method not implemented.");
  }
}

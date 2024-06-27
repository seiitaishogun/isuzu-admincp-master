import { InsertOrUpdateSieuThi } from './tao-moi-sieu-thi-dialog';
import { STORAGE } from '../../../helpers/storage';
import { Notify } from '../../../resources/base/notify';
import { PLATFORM } from 'aurelia-pal';
import { logger } from '../logger';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { ViewModelBase } from '../../../resources/base/viewmodel-base';
import { Filter } from '../../../resources/base/filter-base';
import { DialogController, DialogService } from "aurelia-dialog";
@inject(DialogController, DialogService, STORAGE)

export class InsertOrViewSieuThi implements ViewModelBase {
    constructor(private dialogcontroller: DialogController,  private dialogServices: DialogService,
      private storage: STORAGE) {
      PLATFORM.moduleName('./view-sieu-thi-dialog.ts')
    }
   
    filter: Filter = { skip: 0, limit: 10, where: {} }
    itemDto: any;
    itemsCount: number;
    items: any;
    selectedItem: any;
    selectedList: any;



    public runDeleteMany(ids): void {
        throw 'Not Implemented';
    }

    public runUpdate(item): void {

      this.dialogServices.open({ viewModel: InsertOrUpdateSieuThi, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {

        } else {
            logger.info("Cancel");
        }
    });
      
    }

    async runDelete(item) {
      
    }

    public runCreate(): void {

      this.dialogServices.open({ viewModel: InsertOrUpdateSieuThi, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {

        } else {
            logger.info("Cancel");
        }
    });
    
    }

    async runFilter() {
      
    }
    async activate(item: any) {
        this.itemDto = item;
        this.itemsCount = 0;
        await this.runFilter();

    }
 
    async paginationChanged(event) {
        await this.runFilter()
    }
   
}

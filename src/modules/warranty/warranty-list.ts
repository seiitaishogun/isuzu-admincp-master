import { UpdateWarrantyDialog } from './dialogs/update-warranty-dialog';
import { DialogService } from 'aurelia-dialog';
import { autoinject } from "aurelia-framework";
import { Filter } from './../../resources/base/filter-base';
import { WarrantyModel } from './models/warranty.model';
import { WarrantyService } from './services/warranty.service';

@autoinject
export class WarrantyList {
  items: WarrantyModel[] = [];
  itemsCount: number = 0;

  filter: Filter = {
    order: "type ASC",
    skip: 0,
    limit: 10,
    where: {
    }
  };
  asyncTask: any;

  constructor(private WarrantySer: WarrantyService,
    private dialogService: DialogService) {
  }

  async activate() {
    await this.runFilter()
  }

  async paginationChanged(event) {
    await this.runFilter()
  }

  async runFilter() {
    [this.items, this.itemsCount] = await Promise.all([this.WarrantySer.GetAll(this.filter), this.WarrantySer.GetCount(this.filter)]);
    console.log('this.items', this.items);
    console.log('this.itemsCount', this.itemsCount);
  }

  runUpdate(item): void {
    this.dialogService.open({ viewModel: UpdateWarrantyDialog, model: item }).whenClosed((result) => {
      if (!result.wasCancelled) {
        this.runFilter()
      } else {
        console.log("Cancel");
      }
    });
  }

}

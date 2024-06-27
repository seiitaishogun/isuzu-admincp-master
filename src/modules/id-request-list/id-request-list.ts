import { ReplyIdRequestDialog } from './dialogs/reply-id-request-dialog';
import { inject } from 'aurelia-dependency-injection';
import { AppUserService, AppUserServiceImpl } from './../app-users/services/user-service';
import { RequestUserIdService } from './services/request-user-id.service';
import { RequestUserIdModel } from './models/request-user-id.model';
import { DialogService } from 'aurelia-dialog';
import { autoinject } from "aurelia-framework";
import { Filter } from './../../resources/base/filter-base';


@inject(RequestUserIdService, AppUserServiceImpl, DialogService)
export class IdRequestList {
  items: RequestUserIdModel[] = [];
  itemsCount: number = 8;

  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {} };
  asyncTask: any;

  constructor(private requestUserIdService: RequestUserIdService,
    private appUserSrv: AppUserService,
    private dialogService: DialogService) {
  }

  async activate() {
    await this.runFilter()
  }

  async paginationChanged(event) {
    await this.runFilter()
  }

  async runFilter() {
    this.items = await this.requestUserIdService.GetAll(this.filter);
    console.log('this.items', this.items);


  }

  async getUserInfo(userId: number, typeProp: string): Promise<string> {
    const result = await this.appUserSrv.GetAll({ where: { id: userId } });

    let value: string = result[0] && result[0][typeProp] || "";
    return value;
  }

  async runUpdate(item: RequestUserIdModel): Promise<void> {
    const result = await this.appUserSrv.GetAll({ where: { id: item.userId } });
    if (result[0]) {
      item["name"] = result[0].name;
      item["phone"] = result[0].username;
    }

    this.dialogService.open({ viewModel: ReplyIdRequestDialog, model: item }).whenClosed(async result => {
      if (!result.wasCancelled) {
        await this.runFilter();

      } else {
        await this.runFilter();

      }
    });
  }

}

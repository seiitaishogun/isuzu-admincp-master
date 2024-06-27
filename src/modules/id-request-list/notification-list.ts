import { Notify } from './../../resources/base/notify';
import { NotificationDialog } from './dialogs/notification-dialog';
import { DialogService } from 'aurelia-dialog';
import { autoinject } from "aurelia-framework";
import { Filter } from './../../resources/base/filter-base';
import { AppUserService } from './../app-users/services/user-service';
import { ReplyIdRequestDialog } from './dialogs/reply-id-request-dialog';
import { RequestUserIdModel } from './models/request-user-id.model';
import { NotificationService } from './services/notification.service';


@autoinject
export class NotificationList {
  items: RequestUserIdModel[] = [];
  itemsCount: number = 8;

  filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {} };
  asyncTask: any;

  constructor(private notificationService: NotificationService,
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
    [this.items, this.itemsCount] = await Promise.all([this.notificationService.GetAll(this.filter),
    this.notificationService.GetCount(this.filter)]);

    console.log('this.items', this.items, this.itemsCount);
  }

  runCreate() {
    this.dialogService.open({ viewModel: NotificationDialog, model: null }).whenClosed((result) => {
      if (!result.wasCancelled) {
        this.runFilter();
      } else {
        this.runFilter();
      }
    });

  }

  runDelete(item) {
    Notify.alertConfirm(result => {
      if (result)
        this.notificationService.Delete(item.id).then(_ => this.runFilter());
      else
        Notify.alertCancel();

    })
  }

  runUpdate(item) {
    this.dialogService.open({ viewModel: NotificationDialog, model: item }).whenClosed((result) => {
      if (!result.wasCancelled) {
        this.runFilter();
      } else {
        this.runFilter();
      }
    });
  }



}

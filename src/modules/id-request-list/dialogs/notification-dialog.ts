import { NotificationModel } from './../models/notification.model';
import { DialogController, DialogService } from "aurelia-dialog";
import { autoinject } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory } from "aurelia-validation";
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { RequestUserIdModel } from './../models/request-user-id.model';
import { NotificationService } from './../services/notification.service';
import { RequestUserIdService } from './../services/request-user-id.service';

@autoinject
export class NotificationDialog {
  validationcontroller: ValidationController;

  constructor(private dialogcontroller: DialogController,
    private controllerFactory: ValidationControllerFactory,
    private dialogServices: DialogService,
    private notificationService: NotificationService) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }

  get getTitle() {
    return 'Tạo mới';
  }

  item: NotificationModel;

  async activate(dto: NotificationModel) {
    console.log('dto', dto);

    this.item = dto;

  }

  async sendNotification() {

    if (this.item.id) {
      this.item.status = 'UPDATE';

      await this.notificationService.Patch(this.item)
        .then(res => this.dialogcontroller.ok());
    } else {
      this.item.status = 'NEW';

      await this.notificationService.Post(this.item)
        .then(res => this.dialogcontroller.ok());
    }

  }

}

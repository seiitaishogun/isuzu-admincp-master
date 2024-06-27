import { RequestUserIdService } from './../services/request-user-id.service';
import { NotificationService } from './../services/notification.service';
import { RequestUserIdModel } from './../models/request-user-id.model';
import { DialogController, DialogService } from "aurelia-dialog";
import { autoinject } from 'aurelia-framework';
import { ValidationController, ValidationControllerFactory } from "aurelia-validation";
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { NotificationModel } from '../models/notification.model';

@autoinject
export class ReplyIdRequestDialog {
  validationcontroller: ValidationController;

  constructor(
    private dialogcontroller: DialogController,
    private controllerFactory: ValidationControllerFactory,
    private dialogServices: DialogService,
    private notificationService: NotificationService,
    private requestUserIdService: RequestUserIdService
  ) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }

  get getTitle() {
    return 'Reply';
  }

  item: RequestUserIdModel;
  deviceInfo: IDeviceInfo;

  async activate(dto: RequestUserIdModel) {
    console.log('dto', dto);

    this.item = dto;
    this.deviceInfo = await this.getDeviceUserInfo(dto.userId);
    console.log('this.deviceInfo', this.deviceInfo);

  }

  async sendNotification(): Promise<any> {

    // send push noti /UserDeviceTokens
    await this.notificationService.sendPushNoti_Specific_Device(this.item.reply_title, this.item.reply_message, this.deviceInfo.deviceToken);
    
    // update /IdRequests
    this.item.replyTime = new Date();
    this.item.status = 'REPLIED';
    await this.requestUserIdService.Patch(this.item);

    this.dialogcontroller.ok();

  }

  async getDeviceUserInfo(userId: number): Promise<IDeviceInfo> {
    let { data } = await this.notificationService.getDeviceInfoByUserId(userId);
    console.log('data', data);
    
    let dataResult = data && data[0] || {};
    let deviceInfo = dataResult.deviceInfo || {}
    return {
      deviceToken: dataResult.deviceToken,
      model: deviceInfo.model,
      platform: deviceInfo.platform,
      version: deviceInfo.version,
      manufacturer: deviceInfo.manufacturer,
    }

  }

}

interface IDeviceInfo {
  deviceToken: string;
  model: string;
  platform: string;
  version: string;
  manufacturer: string;
}

import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { KhachHang } from '../models/khach-hang';
@inject(DialogController, ValidationControllerFactory)

export class InsertOrViewKhachHang {
  validationcontroller: ValidationController;
  constructor(private dialogcontroller: DialogController, private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  khachhangDto: KhachHang;
  activate(dto: KhachHang) {
    logger.info('dto', dto);
    this.khachhangDto = dto;
  }

}

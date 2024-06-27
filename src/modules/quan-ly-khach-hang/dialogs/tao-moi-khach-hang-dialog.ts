import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { KhachHang,khachHangValidation } from '../models/khach-hang';
import { KhachHangServiceImpl, KhachHangService } from '../services/khach-hang-service';
import { Filter } from '../../../resources/base/filter-base';
@inject(KhachHangServiceImpl, DialogController, ValidationControllerFactory)

export class InsertOrUpdateKhachHang {
  validationcontroller: ValidationController;
  constructor(
    private KhachHangSrv: KhachHangService,
    private dialogcontroller: DialogController, 
    private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    if (this.khachhangDto.id) return "Cập nhật";
    return "Add mới";
  }
  khachhangDto: KhachHang;
  asyncTask;
  items: KhachHang[];
  filter: Filter = { skip: 0, where: {} };
  async activate(dto: KhachHang) {
    //this.khachhangDto= new KhachHang()
    logger.info('dto', dto);
    this.khachhangDto = dto;
    this.filter.where = { id : {"neq" :this.khachhangDto.id} };
    if (this.khachhangDto.id) 
     await this.KhachHangSrv.GetAllNew(this.filter).then(rec => this.items = rec)
    else
    await this.KhachHangSrv.GetAllNew().then(rec => this.items = rec)

  }

  checkMaSoThue(maso : string): boolean {
    var flag = false

    if (maso !== null && maso !== undefined)
      var stringmaso = maso.toString().length
    else var stringmaso = 0;

    var masothue = new Array<String>();
    this.items.forEach(element => {
      masothue.push(element.maSoThue)
    });

    // logger.info("masothue", masothue)

    if (stringmaso < 10){
      flag = false;
      alert('Bạn nhập thiếu ký tự Mã số thuế');
    }
      else {
        if ( (masothue.includes(maso)) ){
          flag = false;
          alert('Bạn nhập trùng Mã số thuế');
        }
          else {
            flag = true
          }
      }
    return flag
  }
  save() {
    if (this.checkMaSoThue(this.khachhangDto.maSoThue) === false){
      // logger.info("checkMaSoThue", this.checkMaSoThue(this.khachhangDto.maSoThue))
    } else {
      this.validationcontroller.validate({object: this.khachhangDto,rules:khachHangValidation}).then((result) => {
        if (result.valid) {
          this.dialogcontroller.ok(this.khachhangDto);
        }
      })
    }

  }

}

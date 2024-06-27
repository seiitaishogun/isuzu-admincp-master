import { AppSetting } from './../../../appsettings/index';
import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { HopDong } from '../models/hop-dong';
@inject(DialogController, ValidationControllerFactory)

export class InsertOrUpdateHopDong {
  validationcontroller: ValidationController;
  constructor(private dialogcontroller: DialogController, private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    if (this.HopDongDto.id) return "Cập nhật";
    return "Add mới";
  }
  HopDongDto: HopDong;
  deleteFile:string;
  uploadLink : string = AppSetting.apiEndPoint + 'api/HopDongContainers/hopdong-01/upload';

  activate(dto: any) {
    if(dto.fileHopDong=='' || dto.id == undefined)
      dto.showInputUpload = true;
    else
      dto.showInputUpload = false;
    
    this.HopDongDto= dto;
    if(this.HopDongDto.fileHopDong!=undefined &&this.HopDongDto.fileHopDong.name!="")
    this.HopDongDto.showInputUpload = false;
    logger.info('dto', dto);
    // this.khachhangDto = dto;
  }
  deleteFileHopDong(){
    this.HopDongDto.fileHopDong = "";
    this.HopDongDto.showInputUpload=true;
  //  this.HopDongDto.showInputUpload = true;
  }
  private getName(filePath: string) : string {
    if (filePath == null || filePath == undefined) return "";
    console.log('path  '+ filePath);
    return filePath.split('/').pop()
  }
  runDelete(){
  this.HopDongDto.fileHopDong = {};
  this.HopDongDto.showInputUpload=true;
  }
  save() {
    this.validationcontroller.validate().then((result) => {
      if (result.valid) {
        logger.info('dto', this.HopDongDto);
        this.dialogcontroller.ok(this.HopDongDto);
      }
    })

  }

}

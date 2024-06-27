import { AppSetting } from '../../../appsettings/index';
import { logger } from '../logger';
import { BootstrapFormRenderer } from '../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
@inject(DialogController, ValidationControllerFactory)

export class InsertOrUpdateSieuThi {
  validationcontroller: ValidationController;
  constructor(private dialogcontroller: DialogController, private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    // if (true) return "Cập nhật";
    return "Add mới";
  }

  activate(dto: any) {
    
  }
 
 
  runDelete(){
 
  }
  save() {
        this.dialogcontroller.ok();
  }

}

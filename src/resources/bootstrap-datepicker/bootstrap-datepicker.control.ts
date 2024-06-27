import { logger } from './logger';
//https://bootstrap-datepicker.readthedocs.io/en/latest/
import { customElement, bindable, bindingMode, inject, child } from 'aurelia-framework';
import { PLATFORM } from "aurelia-pal";

// import $ from "jquery";
// import * as moment from 'moment';

@customElement("datepicker")
export class DatepickerControl {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value: any;
  @bindable formatDate: string = "dd/mm/yyyy";

  private dateControl: any;

  private static controlId: number = 1;
  private id: string = "";

  constructor() {
    this.id = `datepicker${DatepickerControl.controlId++}`;
    // logger.info('this.id', this.id);
  }

  attached() {
    this.init();
  }

  detached() {
    this.dateControl.datepicker('destroy');
  }

  valueChanged() {
    if (!this.value) this.dateControl.datepicker('update', '');
  }

  private init() {

    // logger.info('value', this.value);
    // this.dateControl = this.value;
    let that = this;
    if (!this.dateControl || this.dateControl !== undefined) {
      // logger.info('that.dateControl', this.dateControl);
      that.dateControl = PLATFORM.global.$("#" + that.id).datepicker({
        language: 'vi',
        format: that.formatDate,
      }).on('changeDate', function (e: any) {
        // logger.info('e.date', e);
        that.selectedItem(e.date);
      });
      // logger.info('value', this.value);
      let newDate = new Date(this.value);
      // logger.info('newDate', newDate);
      // if (this.value) this.dateControl.datepicker('setDate', this.value);
      if (this.value) this.dateControl.datepicker('setDate', newDate);
    }
  }


  private selectedItem(value: any) {
    this.value = value;
    // logger.info('selectedItem() | value', value);
    // this.value = new Date(value);
    // this.value.setMinutes(this.value.getMinutes() + this.value.getTimezoneOffset());
  }
}

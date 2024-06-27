import { PLATFORM } from 'aurelia-pal';
import {  bindable,  bindingMode,  inject,  customAttribute} from 'aurelia-framework';
// import * as moment from 'moment';
const $ = PLATFORM.global.$
@inject(Element)

@customAttribute('datepicker')

export class DatepickterCustomAttribute {
  @bindable format = "DD MMMM YYYY";
  @bindable({defaultBindingMode: bindingMode.twoWay}) datevalue;
  element: any;
  constructor(element) {
    this.element = element;
  }
  attached() {
    // $(this.element).datepicker({

    // })
    this.element = $(this.element).datepicker({
      format:"yyyy-mm-dd"
    }).on('changeDate', e => fireEvent(e.target, 'input'))
  }
  detached() {
    $(this.element).datepicker('destroy');
  }


}
function createEvent(name) {  
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
}
function fireEvent(element, name) {  
  var event = createEvent(name);
  element.dispatchEvent(event);
}

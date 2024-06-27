import { PLATFORM } from 'aurelia-pal';
import {  bindable,  bindingMode,  inject,  customAttribute} from 'aurelia-framework';
@inject(Element)

@customAttribute('switch')
export class SwitchCustomAttribute {
//   @bindable({defaultBindingMode: bindingMode.twoWay}) datevalue;
  element: any;
  constructor(element) {
    this.element = element;
  }
  attached() {
     //new Switchery(this.element,{ size: 'small',color:'#003d7e' });
    // new Switchery.default(this.element,{ size: 'small',color:'#003d7e' });
    
    //  var sw = new Switchery.default(this.element,{ size: 'small',color:'#003d7e' });
     

  var $s = require('scriptjs');
      $s('../../../assets/plugins/switchery/js/switchery.min.js', () => {
          PLATFORM.global.Switchery(this.element,{ size: 'small',color:'#003d7e' });
      });

  }
  detached() {
    // $(this.element).datepicker('destroy');
  }


}

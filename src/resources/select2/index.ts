import { PLATFORM } from 'aurelia-pal';
import { element } from 'aurelia-protractor-plugin/protractor';
import { bindable, bindingMode, inject, customAttribute } from 'aurelia-framework';
import 'select2';
@inject(Element)
@customAttribute('select2')

export class Select2CustomAttribute {

  constructor(private element) {
    this.element = element;
  }
  async attached() {
    var sel = PLATFORM.global.$(this.element).select2();
     
    // preload selected values
     sel.trigger('change');
    //  console.log('trigger change', sel.val()); 

      sel.on('select2:select', (e) => {
        this.element.dispatchEvent(new Event('change'));
        console.log('dispatchEvent'); 
      })

  }
  detached() {
    PLATFORM.global.$(this.element).select2('destroy');
  }

}
/**
    var el = PLATFORM.global.$(this.element).find('select');
    var sel = el.select2();

    // preload selected values
    sel.val(this.selected).trigger('change');

    // on any change, propagate it to underlying select to trigger two-way bind
    sel.on('change', (event) => {
      // don't propagate endlessly
      // see: http://stackoverflow.com/a/34121891/4354884
      if (event.originalEvent) { return; }
      // dispatch to raw select within the custom element
      // bubble it up to allow change handler on custom element
      var notice = new Event('change', {bubbles: true});
      $(el)[0].dispatchEvent(notice);
    }); * 
 */


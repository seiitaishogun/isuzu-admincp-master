import { PLATFORM } from 'aurelia-pal';
import { bindable, bindingMode, inject, customAttribute } from 'aurelia-framework';
@inject(Element)
@customAttribute('btn-async')

export class BtnAsyncAttribute {
  element: Element;
  @bindable task;
  constructor(element) {
    this.element = element; //button
  }
  attached() {
    this.element.addEventListener('click', async () => {
      var $this = PLATFORM.global.$(this.element);
      $this.button('loading');
      await this.task();
      $this.button('reset');
    });

  }
  detached() { }

}

export class asyncBindingBehavior {
 
  bind(binding, source, busymessage) {
    binding.originalupdateTarget = binding.updateTarget;
    binding.updateTarget = (a) => { 
      if (typeof a.then === 'function') {
        if (busymessage) 
          binding.originalupdateTarget(busymessage);
        a.then(d => { binding.originalupdateTarget(d); });
      }
      else
        binding.originalupdateTarget(a);
     };
  }
 
  unbind(binding) {
    binding.updateTarget = binding.originalupdateTarget;
    binding.originalupdateTarget = null;
  }
}

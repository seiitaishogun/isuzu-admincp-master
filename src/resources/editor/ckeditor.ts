import { PLATFORM } from 'aurelia-pal';
import { bindable, bindingMode, inject, customAttribute } from 'aurelia-framework';
@inject(Element)
@customAttribute('ckeditor')

export class CkEditorAttribute {
    constructor(private element) {
    }
    attached() {
        var $s = require('scriptjs');
        // $s('../../../assets/plugins/ckeditor/ckeditor.js', () => {
        //     PLATFORM.global.CKEDITOR.replace(this.element).on('change', (e) => {
        //         this.element.value = e.editor.getData()
        //         this.element.dispatchEvent(new Event('change'));
        //     });
        // }); // localhost
        $s('/admin/assets/plugins/ckeditor/ckeditor.js', () => {
            PLATFORM.global.CKEDITOR.replace(this.element).on('change', (e) => {
                this.element.value = e.editor.getData()
                this.element.dispatchEvent(new Event('change'));
            });
        }); // api
     
       

    }
    detached() { }

}

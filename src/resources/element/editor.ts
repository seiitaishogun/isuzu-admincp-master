import { bindable, bindingMode, inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { AppSetting } from './../../appsettings/index';
@inject(Element)
export class Editor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) websiteId: string;
  @bindable name;
  textArea: any;
  config: any;
  id: any;
  folderUpload: string = ''; // folder upload for btn upload in ckeditor 

  constructor(private element: Element) {
    this.config = {
      height: '700px',
      easyimage_toolbar: ['EasyImageAlignLeft', 'EasyImageAlignCenter', 'EasyImageAlignRight'],
      extraPlugins: 'easyimage, preview, sourcearea',
      removePlugins: 'image',
      removeDialogTabs: 'link:advanced',
      cloudServices_uploadUrl: AppSetting.apiEndPoint + "api/Containers/files/upload", //'http://localhost:6400/api/containers/images/upload',
      // Note: this is a token endpoint to be used for CKEditor 4 samples / developer tests only. Images uploaded using the testing token service may be deleted automatically at any moment.
      // To create your own token URL please visit https://ckeditor.com/ckeditor-cloud-services/.
      cloudServices_tokenUrl: AppSetting.apiEndPoint + "api/containers/get-token", // 'http://localhost:6400/api/containers/get-token',
      baseUrl: AppSetting.apiEndPoint
    };
  }

  attached() {
    // console.log('attach()', this.value);
    this.textArea = this.element.getElementsByTagName('textarea')[0];
    this.textArea.value = this.value || '';
    this.id = new Date().getTime().toString();
    this.textArea.setAttribute('id', this.id) //sử dụng id để tránh bị trùng với các textarea khác 
    var $s = require('scriptjs');
    // $s('../../../assets/plugins/ckeditor/ckeditor.js', () => {
    //   this.editor = PLATFORM.global.CKEDITOR
    //     .replace(this.textArea, this.config || {})
    //     .on('change', (e) => {
    //       this.value = e.editor.getData()
    //       this.element.dispatchEvent(new Event('change'));
    //     });
    //   // console.log('bind editor', JSON.stringify(this.config))
    // })
    $s('/assets/plugins/ckeditor/ckeditor.js', () => {
      this.editor = PLATFORM.global.CKEDITOR
        .replace(this.textArea, this.config || {})
        .on('change', (e) => {
          this.value = e.editor.getData()
          this.element.dispatchEvent(new Event('change'));
        });
      // console.log('bind editor', JSON.stringify(this.config))
    })
  }

  updateValue() {
    this.value = this.textArea.value;
  }

  updateTextArea() {
    if (this.value == undefined) {
      this.value = ''
    }
    this.value = '<figure class="easyimage easyimage-full"><img alt="" sizes="100vw" src="'
      + this.image.anhDaiDien
      + '" width="1000" />'
      + '<figcaption>' + this.image.chuThichAnh + '</figcaption></figure>';

    //BAO: thêm ảnh vào vị trí đang chọn trên CKEDITOR
    PLATFORM.global.CKEDITOR.instances[this.id].insertHtml(PLATFORM.global.CKEDITOR.instances[this.id].getSelection().getNative() + this.value);
    // PLATFORM.global.CKEDITOR.instances[this.id].insertHtml(this.value);
    // PLATFORM.global.CKEDITOR.instances[this.id].setData(this.value)
  }

  image = {
    anhDaiDien: '',
    chuThichAnh: ''
  }

  editor: any;
  bind() {
  }
}

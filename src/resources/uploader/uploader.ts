import { inject } from "aurelia-dependency-injection";
import { bindable, bindingMode } from "aurelia-framework";
import axios from "axios";
@inject(Element)
export class UploaderCustomElement {
  @bindable uri;
  @bindable accept;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) result;
  selectedFiles;
  container;
  name;

  getFileName = (url: string): string => {
    if (!url) return undefined;
    return url.slice(url.lastIndexOf("/") + 1);
  };

  async filesChange() {
    let formData = new FormData();
    formData.append("upload", this.selectedFiles[0]);
    axios
      .post(this.uri, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        this.result = res.data;
        this.value = this.result.default;
        this.name = this.getFileName(this.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

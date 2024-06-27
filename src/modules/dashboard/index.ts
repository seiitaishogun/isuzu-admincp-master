import { PLATFORM } from 'aurelia-pal';
// import $ from 'jquery';
import * as moment from 'moment';
import { BindingEngine, computedFrom } from "aurelia-binding";
import { inject } from 'aurelia-dependency-injection';
import { bindable } from 'aurelia-framework';
import * as _ from 'lodash';
const $ = PLATFORM.global.$
@inject(BindingEngine)
export class DashBoard {
  d: any = {}
  person: any = { fn: 'tung', ln: 'pham' };
  ckEditorValue = 'I am from viewmodel'
  private personOrigin = Object.assign({}, this.person);
  constructor() {
  }
  get isDisable() {
    return _.isEqual(this.person, this.personOrigin);
  }
  async doClick() {
    let promise = await this.timerDo(1000);
    return promise;
  }
  timerDo(ms = 0) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, ms) });
  }
  attached() {
    $('#data').jstree({
      'core': {
        'data': [
          {
            "text": "Root node", "children": [
              { "text": "Child node 1" },
              { "text": "Child node 2" }
            ]
          }
        ]
      }, "plugins": ["checkbox"]
    });
  }
}

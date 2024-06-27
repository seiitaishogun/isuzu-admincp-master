import { PLATFORM } from 'aurelia-pal';
import { childViewer } from '../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { AuthenService } from '../../authen/authenService';
@inject(AuthenService, Router)
@inlineView(childViewer)
export class WarrantyRouter {
  router: Router;
  heading = '  Warranty List';

  constructor() {
  }

  configureRouter(config: RouterConfiguration, router: Router) {
      
    config.map([
        { route: ['', 'warranty-list'], name: 'warranty-list', moduleId: PLATFORM.moduleName('./warranty-list'), nav: true, title: '  Waranty List' },
      ]);

    this.router = router;
  }
}



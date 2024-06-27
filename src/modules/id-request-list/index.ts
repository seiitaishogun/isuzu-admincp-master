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
  heading = '  Danh sách Request UserID';

  constructor() {
  }

  configureRouter(config: RouterConfiguration, router: Router) {

    config.map([
      { route: 'id-request-list', name: 'id-request-list', moduleId: PLATFORM.moduleName('./id-request-list'), nav: true, title: '  Danh sách Request UserID' },
      { route: ['', 'notification-list'], name: 'notification-list', moduleId: PLATFORM.moduleName('./notification-list'), nav: true, title: '  Danh sách Notification' },
    ]);

    this.router = router;
  }
}



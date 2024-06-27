import { PLATFORM } from 'aurelia-pal';
import { childViewer } from '../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { logger } from "./logger";
import { AuthenService } from '../../authen/authenService';
@inject(AuthenService, Router)
@inlineView(childViewer)
export class QuanLy {
  router: Router;
  heading = 'Truck';
  constructor(private authenSrv: AuthenService, rout: Router) {
  }
  configureRouter(config: RouterConfiguration, router: Router) {
      config.map([
        { route: ['', 'ds-truck'], name: 'ds-truck', moduleId: PLATFORM.moduleName('./ds-truck'), nav: true, title: 'sync from website' },
        { route:  'ds-truck-cms', name: 'ds-truck-cms', moduleId: PLATFORM.moduleName('./ds-truck-cms'), nav: true, title: 'UPDATE / CREATE ON CMS' },
      ]);
    this.router = router;
    logger.debug('router', this.router)
  }
}



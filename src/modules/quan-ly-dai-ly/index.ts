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
  heading = 'Dealer';
  constructor(private authenSrv: AuthenService, rout: Router) {
  }
  configureRouter(config: RouterConfiguration, router: Router) {
      config.map([
        { route: ['', 'ds-dealer'], name: 'ds-dealer', moduleId: PLATFORM.moduleName('./ds-dealer'), nav: true, title: 'sync from website' },
        { route:  'ds-dealer-cms', name: 'ds-dealer-cms', moduleId: PLATFORM.moduleName('./ds-dealer-cms'), nav: true, title: 'UPDATE / CREATE ON CMS' },
      ]);
    this.router = router;
    logger.debug('router', this.router)
  }
}



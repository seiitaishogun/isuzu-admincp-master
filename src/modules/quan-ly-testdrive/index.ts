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
  heading = 'Test Drive';
  constructor(private authenSrv: AuthenService, rout: Router) {
  }
  configureRouter(config: RouterConfiguration, router: Router) {
      config.map([
        { route: ['', 'ds-testdrive'], name: 'ds-testdrive', moduleId: PLATFORM.moduleName('./ds-testdrive'), nav: true, title: 'Test Drive' },
      ]);
    this.router = router;
    logger.debug('router', this.router)
  }
}



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
  heading = '  NEWS';
  constructor(private authenSrv: AuthenService, rout: Router) {
  }
  configureRouter(config: RouterConfiguration, router: Router) {
      config.map([
        { route: ['', 'ds-news'], name: 'ds-news', moduleId: PLATFORM.moduleName('./ds-news'), nav: true, title: 'sync from website' },
        { route: 'ds-news-cms', name: 'ds-news-cms', moduleId: PLATFORM.moduleName('./ds-news-cms'), nav: true, title: 'UPDATE / CREATE ON CMS' },
      ]);
    this.router = router;
    logger.debug('router', this.router)
  }
}



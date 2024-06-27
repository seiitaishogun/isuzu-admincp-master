import { PLATFORM } from 'aurelia-pal';
import { childViewer } from './../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { logger } from "./logger";
@inlineView(childViewer)
export class QuanLyKhachHang {
    router: Router;
    heading = 'Quản lý hợp đồng';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'danh-sach-hop-dong'], name: 'danh-sach-hop-dong', moduleId: PLATFORM.moduleName('./danh-sach-hop-dong'), nav: true, title: '  hợp đồng' }]);
        this.router = router;
        logger.debug('router', this.router)
    }
}

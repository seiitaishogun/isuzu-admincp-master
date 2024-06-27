import { PLATFORM } from 'aurelia-pal';
import { childViewer } from './../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { logger } from "./logger";
@inlineView(childViewer)
export class QuanLyKhachHang {
    router: Router;
    heading = 'Quản lý khách hàng';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'ds-khach-hang'], name: 'ds-khach-hang', moduleId: PLATFORM.moduleName('./ds-khach-hang'), nav: true, title: 'DS khách hàng' },
            { route: 'ds-nhan-vien-khach-hang', name: 'ds-nhan-vien-khach-hang', moduleId: PLATFORM.moduleName('./ds-nhan-vien-khach-hang'), nav: true, title: 'DS nhân viên khách hàng' },
            { route: 'ds-nhan-hang', name: 'ds-nhan-hang', moduleId: PLATFORM.moduleName('./ds-nhan-hang'), nav: true, title: 'DS nhãn hàng' },
          ]);
        this.router = router;
        logger.debug('router', this.router)
    }
}

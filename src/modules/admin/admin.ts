
import { AppSetting } from './../../appsettings/index';
import { AuthenService } from './../../authen/authenService';
import { PLATFORM } from 'aurelia-pal';

import { inject } from 'aurelia-dependency-injection';
import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import "../../helpers/loggingSetting";
import "../../helpers/axiosClient"
// import "../../helpers/axiosInterceptor";
import { Notify } from '../../resources/base/notify';
import { DialogService } from 'aurelia-dialog';
import { Filter } from './../../resources/base/filter-base';
import TimeAgo from 'javascript-time-ago';
import vi from 'javascript-time-ago/locale/vi';
import io from 'socket.io-client';

@inject(AuthenService, Router, DialogService)
export class App {
  router: Router;
  userInfo: any;
  notifications: any = [];
  filter: Filter = {};
  //filter: Filter = { where: { active: 0 } };
  showDiv: boolean = false;
  seenNoty: string = 'seenNoty1';
  myItem: any;

  asyncTask
  constructor(private authenSrv: AuthenService, rout: Router,
    private dialogService: DialogService) {
    if (!authenSrv.isAuthenticated) {
      rout.navigateToRoute('login');
    } else {
      this.authenSrv.setHeader();
      this.userInfo = this.authenSrv.userInfo;
      console.log('viet this.userInfo', this.userInfo);
    }
  }
  get isDemo() {
    return AppSetting.apiEndPoint !== 'abc'
  }
  configureRouter(config: RouterConfiguration, router: Router) {
    // console.log('Viet here configuireRouter')
    // let Idrole = this.authenSrv.userInfo.roleId;

    // if (Idrole == 8) {
    //   // config.title = 'Aurelia';

    //   this.router = router;
    // } else {
    //   // config.title = 'Aurelia';

    config.map([

      // {
      //   route: ['','dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('../dashboard/index'), nav: true, title: 'Dashboard',
      //   settings: { icon: 'pg-home' }
      // },

      {
        route: 'login', name: 'login', moduleId: PLATFORM.moduleName('./../../login'), nav: true, title: 'login',
        settings: { icon: 'pg-home' }
      },

      // {
      //   route: 'quan-ly-phong-ban', name: 'quan-ly-phong-ban', moduleId: PLATFORM.moduleName('../quan-ly-phong-ban/index'), nav: true, title: 'Quản lý phòng ban',
      //   settings: { icon: 'pg-tables' }
      // },
      // {
      //   route: ['','man-hinh-chinh'], name: 'man-hinh-chinh', moduleId: PLATFORM.moduleName('../man-hinh-chinh/index'), nav: true, title: 'Màn hình chính',
      //   settings: { icon: 'pg-tables' }
      // },
      {
        route: 'module-mau', name: 'module-mau', moduleId: PLATFORM.moduleName('../module-mau/index'), nav: true, title: 'Module Mẫu',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-khach-hang', name: 'quan-ly-khach-hang', moduleId: PLATFORM.moduleName('../quan-ly-khach-hang/index'), nav: true, title: 'khách hàng',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-hop-dong', name: 'quan-ly-hop-dong', moduleId: PLATFORM.moduleName('../quan-ly-hop-dong/index'), nav: true, title: 'hợp đồng',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-barcode', name: 'quan-ly-barcode', moduleId: PLATFORM.moduleName('../quan-ly-barcode/index'), nav: true, title: 'BARCODE',
        settings: { icon: 'pg-tables' }
      },
      {
        route: ['', 'quan-ly-dai-ly'], name: 'quan-ly-dai-ly', moduleId: PLATFORM.moduleName('../quan-ly-dai-ly/index'), nav: true, title: 'DEALER',
        settings: { icon: 'pg-tables' }
      },

      {
        route: 'quan-ly-lcv', name: 'quan-ly-lcv', moduleId: PLATFORM.moduleName('../quan-ly-lcv/index'), nav: true, title: 'LCV',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-truck', name: 'quan-ly-truck', moduleId: PLATFORM.moduleName('../quan-ly-truck/index'), nav: true, title: 'TRUCK',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-spv', name: 'quan-ly-spv', moduleId: PLATFORM.moduleName('../quan-ly-spv/index'), nav: true, title: 'SPV',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-news', name: 'quan-ly-news', moduleId: PLATFORM.moduleName('../quan-ly-news/index'), nav: true, title: 'NEWS',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-banner', name: 'quan-ly-banner', moduleId: PLATFORM.moduleName('../quan-ly-banner/index'), nav: true, title: 'BANNER',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-contact', name: 'quan-ly-contact', moduleId: PLATFORM.moduleName('../quan-ly-contact/index'), nav: true, title: 'CONTACT',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-testdrive', name: 'quan-ly-testdrive', moduleId: PLATFORM.moduleName('../quan-ly-testdrive/index'), nav: true, title: 'TEST DRIVE',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'quan-ly-accessory', name: 'quan-ly-accessory', moduleId: PLATFORM.moduleName('../quan-ly-accessory/index'), nav: true, title: 'ACCESSORY',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'app-users', name: 'app-users', moduleId: PLATFORM.moduleName('../app-users/index'), nav: true, title: 'ISUZUCARE USER',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'users', name: 'users', moduleId: PLATFORM.moduleName('../quan-ly-users/index'), nav: true, title: 'CMS USER',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'warranty-list', name: 'warranty-list', moduleId: PLATFORM.moduleName('../warranty/index'), nav: true, title: 'WARRANTY LIST',
        settings: { icon: 'pg-tables' }
      },
      {
        route: 'id-request-list', name: 'id-request-list', moduleId: PLATFORM.moduleName('../id-request-list/index'), nav: true, title: 'ID REQUEST LIST',
        settings: { icon: 'pg-tables' }
      },


    ]);

    this.router = router;
    // }

  }

  // async disableThongBao(index, notification) {
  //   this.notifications.splice(index, 1);
  //   let arr = this.canhBaoItems.filter(e => e.id == notification.canhbaoId);
  //   // arr[0].active = 0;
  //   let myIndex = arr[0].nguoinhanThongBao.findIndex(e => e.userId == this.userInfo.userId);
  //   //nguoinhanTB[0].disableThongBao = 1;
  //   arr[0].nguoinhanThongBao[myIndex].disableThongBao = 1;
  //   console.log('viet arr[0]',arr[0]);
  //   await this.canhBaoSrv.Patch(arr[0]);
  //   if (this.notifications.length) {
  //     this.showDiv = false;
  //   } else {
  //     this.showDiv = true;
  //   }
  // }


  createNoty(message, type) {
    var html = '<div id="my-alert" class="alert alert-' + type + ' alert-dismissable page-alert">';
    //    html += '<button type="button" class="close" style="left: 10px"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>';
    html += message;
    html += '</div>';
    $(html).hide().prependTo('#noty-holder').slideDown();

    $("my-alert").click(function (e) {
      e.preventDefault();
      $("my-alert").slideUp("fast");
    });
    //Tự động tắt alert sau 10 giây
    $("#my-alert").fadeTo(10000, 1).slideUp("slow");
    //tham khảo jquery: https://www.w3schools.com/jquery/jquery_fade.asp

    // nhấn nút close mới tắt : không hoạt động được nếu có hàm tự động tắt alert
    // $('.page-alert .close').click(function(e) {
    //     e.preventDefault();
    //     $(this).closest('.page-alert').slideUp();
    // });
  };

  // getHref(modelName: string, modelId: number): string {
  //   switch (modelName) {
  //     case 'YeuCauGiamDinh':
  //       return '#/admin/danh-sach-yeu-cau-giam-dinh';
  //     case 'VuGiamDinh':
  //       return '#/admin/quan-ly-giam-dinh';
  //     case 'HoaDon':
  //       return '#/admin/quan-ly-hoa-don';
  //     case 'ChungThu':
  //       return '#/admin/danh-sach-chung-thu';
  //   }
  // }

  getLogo(modelName: string): string {
    switch (modelName) {
      case 'YeuCauGiamDinh':
        return '../../../assets/img/YCGD_logo.png';
      case 'VuGiamDinh':
        return '../../../assets/img/VGD_logo.png';
      case 'HoaDon':
        return '../../../assets/img/HD_logo.png';
      case 'ChungThu':
        return '../../../assets/img/CT_logo.png';
    }
  }

  // async runUpdate(item) {
  //   await this.yeuCauSrv.Get(item.modelId).then(res => this.ycgdItem=res);
  //   console.log('viet this.ycgdItem=',this.ycgdItem);
  //   this.dialogService.open({ viewModel: InsertOrUpdateDS, model: [this.ycgdItem] }).whenClosed((result) => {
  //     if (!result.wasCancelled) {
  //       //this.runFilter()
  //     } else {
  //     }
  //   });
  // }

  // async runUpdate(item : any) {
  //    this.seenNoty = 'seenNoty2';
  //   switch (item.modelName) {
  //     case 'YeuCauGiamDinh':
  //       await this.yeuCauSrv.Get(item.modelId).then(res => this.myItem = res);
  //       this.dialogService.open({ viewModel: InsertOrUpdateDS, model: [this.myItem] });
  //       return ;
  //     case 'VuGiamDinh':
  //     await this.quanLyGiamDinhSrv.Get(item.modelId).then(res => this.myItem = res);
  //     console.log('viet VuGimDinh this.myItem',this.myItem);
  //     this.dialogService.open({ viewModel: InsertOrView, model: this.myItem });
  //       return ;
  //     case 'HoaDon':
  //     await this.hoaDonSrv.Get(item.modelId).then(res => this.myItem = res);
  //     console.log('viet HoaDon this.myItem',this.myItem);
  //     this.dialogService.open({ viewModel: InsertOrCreateaHoaDon, model: this.myItem });
  //       return ;
  //     case 'ChungThu':
  //     await this.chungThuSrv.Get(item.modelId).then(res => this.myItem = res);
  //     console.log('viet ChungThu this.myItem',this.myItem);
  //     this.dialogService.open({ viewModel: InsertOrCreateChungThu, model: this.myItem});
  //       return ;
  //   }

  // }

  // async showNotifications() {
  //   TimeAgo.addLocale(vi);
  //   const timeAgo = new TimeAgo('vi-VN')
  //   this.canhBaoSrv = new CanhBaoServices();

  //   this.filter.where = {
  //     active: 1,
  //     nguoinhanThongBaoIds : this.userInfo.userId // omg! dòng lệnh ngày có nghĩa là : "array có chứa value"
  //   };


  //   await this.canhBaoSrv.GetAll(this.filter).then(res => this.canhBaoItems = res);

  //    // Ẩn các cảnh báo user đã disable.
  //    let indexArr : number[] = [];
  //    this.canhBaoItems.forEach((e,index) => {

  //      let arr =  e.nguoinhanThongBao.filter( rec => rec.userId == this.userInfo.userId );
  //      if(arr[0].disableThongBao == 1){
  //       indexArr.push(index); // lưu index của cảnh báo cần xóa vào mảng
  //      }
  //    });
  //    indexArr.forEach(e => delete this.canhBaoItems[e]); //tham khảo delete: https://freetuts.net/javascript-tips-cach-xoa-phan-tu-ra-khoi-mang-823.html


  //   this.canhBaoItems = this.canhBaoItems.reverse(); // đưa những cảnh báo mới nhất lên trên Top.
  //   this.notifications = [];
  //   this.canhBaoItems.forEach((e, index) => {
  //     //let myHref = this.getHref(e.modelName, e.modelId);
  //     let myLogo = this.getLogo(e.modelName);
  //     let notificationObject = {
  //       modelId: e.modelId,
  //       modelName: e.modelName,
  //       canhbaoId: e.id,
  //     //  href: myHref,
  //       image: myLogo,
  //       text: e.noidungThongBao,
  //       date: timeAgo.format(new Date(e.ngaytaoThongBao)), // timeAgo giống facebook
  //       //seen: e.nguoinhanThongBao[0].seenThongBao
  //     };
  //     if (!this.notifications[index]) this.notifications.push(notificationObject);
  //   });

  //   if (this.notifications.length) {
  //     this.showDiv = false;
  //   } else {
  //     this.showDiv = true;
  //   }
  //   if(this.notifications.length){
  //     let newestNoty = this.notifications[0];
  //     this.createNoty(` <strong>Cảnh báo:</strong> ${newestNoty.text} <br> <i class="fa fa-clock-o" aria-hidden="true"></i> ${newestNoty.date}`, 'danger');
  //   }
  // }

  async attached() {
    var script = document.createElement("script");
    script.src = "assets/scripts.js";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);

    //viet

    // this.showNotifications();
    // var socket = io.connect('http://localhost:800'); // đặt tên cổng khác với cổng của backend và cổng của cms
    // var socket = io.connect('http://103.199.18.44:800'); // đặt tên cổng khác với cổng của backend và cổng của cms
    // socket.on('new_notification', async (data) => {
    // this.showNotifications();
    // });

    //viet-end
  }

  enableAdminNav(): boolean {
    // var list = ["admin", "admin01", "tuanvq"];
    // if (list.includes(this.userInfo.userName)
    //   || this.authenSrv.userInfo.roleId == Roles.Admin    //admin role
    //   || this.authenSrv.userInfo.roleId == Roles.GiamDoc
    //   || this.authenSrv.userInfo.roleId === Roles.KinhDoanh
    //   || this.authenSrv.userInfo.roleId === Roles.KinhDoanhCN
    //   || this.authenSrv.userInfo.roleId === Roles.PhoGiamDocHD
    //   || this.authenSrv.userInfo.roleId === Roles.GiamDocCN) {
    //   return true;
    // }
    // else
    //   return false;
    return true;
  }






  runLogout() {
    this.authenSrv.logout();
  }
  async runSetting(iduser: number) {
    console.info('id user', iduser)
    let filter = { skip: 0, limit: 10, where: { id: iduser } };
    console.info('filter', filter)

  }

  notify = new Notify();

}

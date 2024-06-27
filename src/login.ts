import { Notify } from './resources/base/notify';
import { AuthenService, UserCredential } from './authen/authenService';
import swal from 'sweetalert';
import { STORAGE } from './helpers/storage';
import { Aurelia, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from "aurelia-pal";
@inject(Aurelia, Router, AuthenService)

export class Login {
  userCredential: UserCredential = new UserCredential();
  constructor(private aurelia: Aurelia, private router: Router, private authSrv: AuthenService) {
    if (authSrv.isAuthenticated)
      this.router.navigateToRoute('admin')
  };
  login() {
    this.authSrv.login(this.userCredential).then(value => {
      if (value && this.authSrv.isAuthenticated) {
        this.router.navigateToRoute('admin')
      }
      else if (this.authSrv.userInfo.isActive == false) {
        Notify.alertError("Tài khoản Đã Bị Khóa");
      }
      else
        Notify.alertError("Tài khoản không đúng");
    }).catch(e => {
      Notify.alertError(e.message);
    })
  }
  private showError(err) {
    PLATFORM.global.swal("Đăng nhập không thành công", `${err}`, "error");
  }
}

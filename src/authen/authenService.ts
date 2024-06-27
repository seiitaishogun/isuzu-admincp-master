import { AppSetting } from './../appsettings/index';
import { logger } from './logger';
import { PLATFORM } from 'aurelia-pal';
import { STORAGE } from './../helpers/storage';
import { inject } from 'aurelia-framework';
import axios from 'axios';

@inject(STORAGE)
export class AuthenService {
  constructor(private storage: STORAGE) {

  }
  get isAuthenticated(): boolean {
    let token = this.storage.get(STORAGE.tokenKey);
    if (token && this.isActive)
      return true;
    return false;
  }
  get userInfo(): any {
    let userInfo = this.storage.get(STORAGE.userInfoKey);
    if (userInfo) 
      return userInfo;
    return undefined;
  }

  get isActive() : boolean {
    let userInfo = this.userInfo;
    if (userInfo && userInfo.isActive)
      return userInfo.isActive;
    return false;
  }
  logout() {
    this.storage.remove(STORAGE.tokenKey);
    this.storage.remove(STORAGE.userInfoKey);
    PLATFORM.location.reload();

  }
  login(userCredential: UserCredential): Promise<boolean> {
    let self = this;
    
    return new Promise((resolve, reject) => {
      axios.post(AppSetting.apiEndPoint+"api/CmsUsers/login",userCredential).then(function(res) {
          logger.info('userCredential',res )
          self.setAxiosGlobal(res.data.id);
          if (res.data.userId !== undefined && res.data.userId > 0 ) {
            axios.get(AppSetting.apiEndPoint+"api/CmsUsers/" + res.data.userId).then(function(userData) {
              logger.info('data',userData )
              self.storage.set(STORAGE.userInfoKey, { 
                userId: userData.data.id,
                userName: userData.data.username, 
                phongBanId: userData.data.phongBanId,
                // dsphongBanId: userData.data.phongBanQuanLyId,
                image: "https://dummyimage.com/60x60/000/ff008c",
                roleId : userData.data.roleId,
                isActive: userData.data.isActive || false,
                })
              self.storage.set(STORAGE.tokenKey, res.data.id);
              resolve(true);
            })
          }
      }).catch(err=>{
        logger.info('Không thể đăng nhập',err )
        resolve(false);
      })

    })
  }
  private async GetById(userId: number) : Promise<any>{
    return await axios.get(AppSetting.apiEndPoint+"api/CmsUsers/" + userId)
  }
  
  setHeader() {
    let token = this.storage.get(STORAGE.tokenKey);
    this.setAxiosGlobal(token);
  }

  private setAxiosGlobal(token: string) {
    axios.defaults.headers = { 'Authorization': token };
    logger.info('Add axios header Authorization global');
  }
}
export class UserCredential {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}



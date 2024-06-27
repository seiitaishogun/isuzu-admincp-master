import { logger } from './logger';
export class AppSetting {
  // static readonly apiEndPoint: string = 'https://isuzucare.isuzu-vietnam.com/';  //localhost
  static readonly apiEndPoint: string = 'http://localhost:7100/';  //localhost
  // static readonly apiEndPoint: string = 'https://api-isuzu.thithu.online/';  //localhost
  static readonly uploadExelPath: string = AppSetting.apiEndPoint + 'api/Containerxlsxes/xlsx/upload';
  static readonly parsePath: string = AppSetting.apiEndPoint + 'api/Containerxlsxes/parse';

  static readonly uploadFiles: string = AppSetting.apiEndPoint + 'api/Containers/files/upload';
  static readonly uploadImages: string = AppSetting.apiEndPoint + 'api/Containers/images/upload';
  
  static readonly uploadBanners: string = AppSetting.apiEndPoint + 'api/ImageContainers/images/upload';


  /**Cho website */
  static readonly UploadFolder = 'anh-dai-dien'
  static readonly ImagePath = AppSetting.apiEndPoint + 'api/BaiVietContainers/' + AppSetting.UploadFolder; 
  static readonly UploadPath: string = AppSetting.ImagePath;
  static readonly DownloadPath: string = AppSetting.ImagePath + '/download';

  static readonly TimeAutoSave:number = 20000;
}









export class Roles {
  static User: number = 1;
  static Admin: number = 2;
 

}












export enum HonNhan {
  Single,    // độc thân
  Married,   // Đã kết hôn
  Engaged,   // Đã đính hôn
  Separated, // Ly thân
  Divorced,  // Ly hôn
  Widow,     // Quả phụ (Chồng mất)
  Widower    // Góa vợ  (vợ mất)
}

export enum GioiTinh {
  Male,    // Giới tính nam
  Female,  // Giới tính nữ
  Lesbian, // Đồng tính nữ,
  Gay,     // Đồng tính nam 
}

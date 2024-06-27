import { ValidationRules } from 'aurelia-validation';
export class HopDong {  showInputUpload: boolean;

    id: number
    ten: string
    ngayKy: Date
    ngayHieuLuc: Date
    ngayHetHieuLuc:Date
    khachHangId:number
    fileHopDong:any
    fileHopDongDelete:any
    soHopDong:string
    ghiChu:string
    constructor() {
    }
}

ValidationRules['invalidTenHopDong'] = `\${$displayName} không được phép trống.`;

export const hopDongValidation = ValidationRules
  .ensure((i: HopDong) => i.ten).displayName('Tên Hợp Đồng').required().withMessageKey('invalidTenHopDong')
  .on(HopDong).rules;

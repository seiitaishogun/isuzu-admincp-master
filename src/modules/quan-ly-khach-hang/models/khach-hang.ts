import { ValidationRules } from 'aurelia-validation';
// dinh nghia den day thoi
// HTDanh thay đổi bổ sung theo api http://qlgd.eic.com.vn:8001/explorer/#!/KhachHang/KhachHang_find
export class KhachHang {
    id: number
    ma: number
    hoTen: string
    nameEnglish: string
    shortname: string
    diaChi: string
    email:string
    fax:string
    soDienThoai:string
    soTaiKhoan:string
    taiNganHang:string
    maSoThue:string
    soHopDong:string
    ghiChu:string
    dsHopDongIds : number[]
    trangThai: any;
    loaiKhachHang: string="QLGD";

    tenTaiKhoan: string;
    matMatTaiKhoan: string;


    // Add ngày tạo khách hàng
    ngayTao: Date = new Date();
    
    constructor() {
    }
}

ValidationRules['invalidMaKhachHang'] = `\${$displayName} không được phép trống.`;
ValidationRules['invalidHoTenKhachHang'] = `\${$displayName} không được phép trống.`;
ValidationRules['invalidEmail'] = `\${$displayName} phải nhập địa chỉ email.`;

export const khachHangValidation = ValidationRules
  .ensure((i: KhachHang) => i.ma).displayName('Mã khách hàng').required().withMessageKey('invalidMaKhachHang')
  .ensure((i: KhachHang)=>i.hoTen).displayName('Tên khách hàng').required().withMessageKey('invalidHoTenKhachHang')
  .ensure((i: KhachHang)=>i.email).displayName('Email').email().withMessageKey('invalidEmail')
  .on(KhachHang).rules;

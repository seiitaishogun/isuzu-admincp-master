
## Sử dụng:
> 2 giải pháp in hóa đơn

### Tối ưu: tạo ra html template và xuất ra PDF 
- chuyển excel template thành dạng html table: copy/paste vào CKeditor, và html source 
- bỏ vào template html của JSREPORT
- điều chỉnh html table cho phù hợp 
- tham khảo : 
  - printHoaDon() : xuất ra file pdf
  - https://gitlab.com/eic-document/eic-document-spa/commit/235ec2d5d4b1d6f1dd3fbfa874b1a520ccb8e238

- Chưa tốt: xuất ra excel files từ xlsx template có sẵn

### Điều chỉnh HTML template (PDF)

- Template dành cho PDF gồm 3 phần tùy chỉnh chính
  - `templates`: file chứa source html, css
  - `data`: chứa cấu trúc dữ liệu để sinh ra PDF mẫu
  - `images`: chứa hình ảnh, logo, dùng trong file PDF
  - các phần này được thay đổi trong Properties

- `Hoadon-PDF`: là `templates` để xuất PDF
  - sử dụng cú pháp `handlebar` để binding dữ liệu từ `data`, ví dụ `{{ngay}}`, `{{#each soTien}} ... {{/each}}`
  - nội dung dưới dạng table, gồm 12 cột,  dùng css để thay đổi hiển thị 

- `eic-hoadon`: là `data` để xuất mẫu
  - thêm bớt thuộc  tính và binding ra `template`, sau đó **RUN** để xem kết quả
  - khi xuất report, post dữ liệu theo đúng cấu trúc json này

- sample post json 
```
request = {
      template: { "shortid": "rkJTnK2ce" },
      data: {}
}
```  
- minh họa
  - hoadonPDF: http://103.199.18.44:5488/studio/templates/rkJTnK2ce
  - [hinh](https://gitlab.com/eic-document/eic-document-spa/blob/master/docs/Hoa-Don/jsreport-template.png)
- Lưu ý: lưu lại nội dung html, css vào file `html-hoadon.html` để backend

## Tích hợp với Aurelia
> https://jsreport.net/learn/browser-client

```
npm install jsreport-browser-client-dist
```

- copy file `node_modules\jsreport-browser-client-dist\jsreport.min.js` vào thư mục bất kì, ví dụ `helpers/jsreport.min.js`

- gọi lệnh trong file `xxx.js`, 

```
let jsreport = require('../../helpers/jsreport.min');
jsreport.serverUrl = 'https://baotrinh.jsreportonline.net'; // server chạy JSREPORT, xem phần cài đặt bên dưới

```
- xem commit https://gitlab.com/vinaas/easyquiz-cms/commit/0ff3e13b6158d5995ecea1ab35a507b485960b79

 
## Install JSREPORT Server

> OnPremise:  https://jsreport.net/on-prem

```
npm install jsreport-cli -g
jsreport init
jsreport start
```

### Phantom PDF
>  https://github.com/jsreport/jsreport-phantom-pdf

```
npm install jsreport-phantom-pdf
```

- fix lỗi khi chạy `while loading shared libraries: libfontconfig.so.1`

```
sudo apt-get install libfontconfig
```


### Demo hoạt động
- truy cập http://103.199.18.44:5488/studio/templates/HJH11D83ce
- bấm `RUN` và xem file report xuất ra bên cạnh
- sửa hiển thị trong file template, `Save` và chạy lại 

```
ALTER TABLE public.khachhang ADD COLUMN trangThai text;
UPDATE public.khachhang SET trangThai = 'INACTIVE';
```

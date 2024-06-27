## Fix
- Lỗi khi cài đặt aurelia-google-maps plugin:
`__WEBPACK_IMPORTED_MODULE_0_aurelia_pal__.a.injectStyles is not a function`
--> Cách fix: hãy cài đặt phiên bản 2.1.0 
- npm install aurelia-google-maps@2.1.0 --save
- Hướng dẫn lấy API Key Google Maps:
https://www.tranbadat.com/2018/11/huong-dan-lay-google-maps-api-key-moi-nhat-2018-cho-wordpress.html
- Muốn API key hoạt động thì phải bật thanh toán và nhập thông tin thẻ VISA/MASTERCARD : https://console.cloud.google.com/projectselector2/billing/enable?_ga=2.220981784.1827375403.1565621460-789556756.1563610242

## Fix lỗi không vào được CMS = link 

- Link CMS https://isuzucare.isuzu-vietnam.com/admin

- Sau khi build xong bằng lệnh `npm start -- build`

- Vào thư mục /dist điều chỉnh lại file index.html như sau 
```
<head>
    <meta charset="utf-8">
    <title>ISUZU VIETNAM CO., LTD.</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <base href="/admin/">   // điều chỉnh ở đây
    <link rel="icon" type="image/png" href="favicon.ico">
    <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css">
    <link href="assets/plugins/bootstrapv3/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="assets/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" media="screen">
    <link href="assets/plugins/bootstrap-datepicker/js/locales/bootstrap-datepicker.vi.js" rel="stylesheet"
        type="text/javascript" media="screen">
    <link href="assets/plugins/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" type="text/css"
        media="screen">
    <link href="assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css"
        media="screen">
    <link href="assets/plugins/switchery/css/switchery.min.css" rel="stylesheet" type="text/css" media="screen">
    <link rel="stylesheet" href="assets/plugins/jstree/themes/default/style.min.css">
    <link class="main-stylesheet" href="assets/css/pages.css" rel="stylesheet" type="text/css">
    <link href="4b0c1eaffe90f4a9f9a6618272db790b.css" rel="stylesheet">
</head>

<body aurelia-app="main" class="fixed-header horizontal-menu">
    <div class="splash">
        <div class="portlet-progress large" style="background-color: rgba(255, 255, 255, 0.8); display: block;">
            <div class="progress-circle-indeterminate progress-circle-master"></div>
            <div class="loading-logo">ADMIN</div>
        </div>
    </div>
    <script src="assets/js/pages.js" type="text/javascript"></script>
    <script src="assets/plugins/jstree/jstree.min.js"></script>
    <script type="text/javascript" src="common.d577ce0ecf3dcd08fb5a.bundle.js"></script> // điều chỉnh ở đây
    <script type="text/javascript" src="app.6b9afa2d1fa5777762c0.bundle.js"></script> // điều chỉnh ở đây
    <script type="text/javascript" src="vendor.a031bca6f1afbfd79d52.bundle.js"></script> // điều chỉnh ở đây
</body>
```

- Sau đó copy source vào VPS, thư mục `/var/www/isuzu-phase2/api-todo/cms`


- Fix lỗi ckeditor khi không hiển thị khi deploy

- Vào file editor.ts (\src\resources\element\editor.ts)
- Thê, /admin/ vào link đường dẫn
```
    $s('/admin/assets/plugins/ckeditor/ckeditor.js', () => {
```
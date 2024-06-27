

ChungThu 
```
{
  id
  vgdid :, 

  importData : {
    header : string[],
    row : string[][]
  }
  exportData : {
     import : {}
     input: {}
  }
}

//step
1. upload file excel import
  - kiem tra file exist, neu trung thi doi ten moi
  - upload file moi len

1. phan tich du lieu trong file
  - importData = noi dung file excel
  - validateImportData()

1. luu vao db 
  - patch ChungThu


1. cap nhat inputdata
 - vao cac truong rieng 


1. xuat report (pdf | excel)
  - validateExport() 



function validateExport() : boolean{
  var exportData = {}
  if (validateInputData()) {

  }else {
    //show thong bao loi
  }
  if (validateImportData()) {

  }else {
    //show thong bao loi
  }
  
  return true / false;
}
warningMessage : string = ''; 
function validateInputData() : boolean {
  var input = {}; 
  var flag = true; 
  if (vgdId !== undefined) {
    input.vgdId = vgdid;
  }else {
    flag = false;
    this.warningMessage = "thieu truong abc ";  
  }
  if (vgdId !== undefined) {
    input.vgdId = vgdid;
  }else {
    flag = false; 
    this.warningMessage = "thieu truong abc ";  
  }
  if (vgdId !== undefined) {
    input.vgdId = vgdid;
  }else {
    flag = false; 
    this.warningMessage = "thieu truong abc ";  
  }
  if (vgdId !== undefined) {
    input.vgdId = vgdid;
  }else {
    flag = false; 
    this.warningMessage = this.warningMessage + ',' +  "thieu truong abc ";  
  }

  exportData.input = input; 
  return flag ; 
}

function validateImportData()  : boolean{
   exportData.import = this.importData; 
  return true / false;
}
```

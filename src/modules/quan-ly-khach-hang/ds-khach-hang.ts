import { InsertOrViewSieuThi } from './dialogs/view-sieu-thi-dialog';
import { Notify } from '../../resources/base/notify';
import { Roles } from '../../appsettings/index';
import { PLATFORM } from 'aurelia-pal';
import { InsertOrUpdateKhachHang } from './dialogs/tao-moi-khach-hang-dialog';
import { InsertOrUpdateHopDong } from './dialogs/tao-moi-hop-dong-dialog';
import { InsertOrViewKhachHang } from './dialogs/view-khach-hang-dialog';
import { InsertOrViewHopDong } from './dialogs/view-hop-dong-dialog';
import { KhachHang } from './models/khach-hang';
import { KhachHangServiceImpl, KhachHangService } from './services/khach-hang-service';
import { Filter } from '../../resources/base/filter-base';
import { ViewModelBase } from '../../resources/base/viewmodel-base';
import { inject } from 'aurelia-framework';
import { logger } from "./logger";
import { DialogService } from "aurelia-dialog";
import { AuthenService } from '../../authen/authenService';

@inject(KhachHangServiceImpl, DialogService, AuthenService)
export class DanhSachKhachHang implements ViewModelBase {
  items: KhachHang[];
  itemsCount: number
  selectedItem: KhachHang;
  selectedList: KhachHang[];
  // filter: Filter = { order: "id desc", skip: 0, limit: 10, where: {} };
  filter: Filter = { order: "id desc", skip: 0,limit:10, where: {}};
  whereFilter : any = { hoTen : {ilike : ""}};
  asyncTask; // task control waiting view
  startDate:Date;
  endDate:Date;

  constructor(private KhachHangSrv: KhachHangService, 
    private dialogService: DialogService,
    private authSrv: AuthenService) {
  }

  async activate(params, routeConfig, navigationInstruction) {
      await this.runFilter()
  }

  async paginationChanged(event) {
      await this.runFilter()
  }

  async runFilter() {
      if (this.whereFilter.hoTen.ilike !== "") {
          this.filter.where["hoTen"] = { ilike : this.whereFilter.hoTen.ilike}
      }
      if(this.startDate !=undefined && this.endDate!=undefined){
        // this.filter.where = Object.assign({},this.filter.where,{ and: [{ "ngayTao": { "lte": new Date(this.endDate) } }, { "ngayTao": { "gte": new Date(this.startDate) } }] });
        this.filter.where["and"] = [ { "ngayTao": { "lte": new Date(this.endDate) } }, 
                                     { "ngayTao": { "gte": new Date(this.startDate) } }
                                   ];
      }else 
        {
          delete this.filter.where["and"]; //BAO: rủi ro nếu delete ở đây
          if(this.startDate != undefined)
            // this.filter.where = Object.assign({},this.filter.where,{ "ngayTao": { "gte": new Date(this.startDate) } });
            this.filter.where["ngayTao"] =  { "gte": new Date(this.startDate) };
          if(this.endDate != undefined)
            this.filter.where["ngayTao"] =  { "lte": new Date(this.endDate) };
        }
      // logger.info('runFilter', this.authSrv.userInfo.userId)
      await (this.asyncTask = Promise.all([
          this.KhachHangSrv.GetAllNew(this.filter).then(rec => this.items = rec),
          this.KhachHangSrv.GetCountNew(this.filter).then(rec => this.itemsCount = rec),
          // this.timerDo(1000) 
      ]))

      
  }

  timerDo(ms = 0) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, ms) });
  }

  async runCreate() {
    //torun gan select tu dialog tra ve
    this.selectedItem = new KhachHang()
    this.dialogService.open({ viewModel: InsertOrUpdateKhachHang, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.selectedItem = result.output;
            this.selectedItem.trangThai = "ACTIVE";
            this.KhachHangSrv.Post(this.selectedItem).then(_ => this.runFilter()).catch(err => Notify.alertError(err))
        } else {
            logger.info("Cancel");
        }
    });
    logger.info("runCreate()", this.selectedItem)
    //this.KhachHangSrv.Post(this.selectedItem)
  }

  async runViewKhachHang(item) {
    //torun gan select tu dialog tra ve
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrViewKhachHang, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.selectedItem = result.output;
            let res;
        } else {
            logger.info("Cancel");
        }
    });
    logger.info("runViewKhachHang()", this.selectedItem)
    //this.KhachHangSrv.Post(this.selectedItem)
  }

  async runViewHopDong(item) {
    //torun gan select tu dialog tra ve
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrViewHopDong, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.selectedItem = result.output;
            let res;
        } else {
            logger.info("Cancel");
        }
    });
    logger.info("runCreate()", this.selectedItem)
    //this.KhachHangSrv.Post(this.selectedItem)
  }

  async runViewDSSieuThi(item){
    this.selectedItem = item;
    this.dialogService.open({ viewModel: InsertOrViewSieuThi, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.selectedItem = result.output;
            let res;
        } else {
            logger.info("Cancel");
        }
    });
    logger.info("runCreate()", this.selectedItem)
    //this.KhachHangSrv.Post(this.selectedItem)
  }
  
  async runCreateHopDong() {
    //torun gan select tu dialog tra ve
    this.selectedItem = new KhachHang()
    this.dialogService.open({ viewModel: InsertOrUpdateHopDong, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.selectedItem = result.output;
            let res;
        } else {
            logger.info("Cancel");
        }
    });
    logger.info("runCreate()", this.selectedItem)
    //this.KhachHangSrv.Post(this.selectedItem)
  }

  checkAdmin() : boolean {
    if(this.authSrv.userInfo.userId === Roles.Admin || this.authSrv.userInfo.userId === Roles.User || this.authSrv.userInfo.userId === 83) return true
    else return false;
  }

  async runUpdate(item) {
    this.selectedItem = item;
        logger.info("runUpdate()", this.selectedItem)
        this.dialogService.open({ viewModel: InsertOrUpdateKhachHang, model: this.selectedItem }).whenClosed((result) => {
            if (!result.wasCancelled) {
                this.selectedItem = result.output;
                this.KhachHangSrv.Put(this.selectedItem).then(_ => this.runFilter()).catch(err => Notify.alertError(err))
            } else {
                logger.info("Cancel");
            }
        });
    
    // this.KhachHangSrv.Put(this.selectedItem)
  }

  // async updateLoaiKhachHang(){
  //   // hàm dùng để cập nhật tất cả các khách hàng có trường loaiKhachHang là null thành "QLGD"
    
  //   for(let index=0;index<this.items.length;index++){
  //     this.items[index].loaiKhachHang="QLGD"
  //     await this.KhachHangSrv.Patch(this.items[index]).then(res => console.log("update success: "+ index));
  //   }

  // }

  async runDelete(item) {
    logger.info("runDelete()", this.selectedItem)
    await Notify.alertConfirm(result => {
        if (result) this.KhachHangSrv.Delete(item.id).then(_ => this.runFilter())
        else Notify.alertCancel()

    })
  }

  async runDeleteMany() {
    logger.info("runDeleteList()", this.selectedList)
    let deletedIds = this.selectedList.map(x => x.id);
    await this.KhachHangSrv.DeleteMany(deletedIds)
  }

  private showSuccess() {
        PLATFORM.global.swal("Thành công", "Thực hiện thành công", "success");
    }
    private showError(err) {
        PLATFORM.global.swal("Không thành công", `${err}`, "error");
    }
    private showCancel() {
        PLATFORM.global.swal("Đã hủy", "Đã hủy thao tác", "warning");
    }
    private confirm(cb) {
        PLATFORM.global.swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                cb(isConfirm)
            })
    }
}

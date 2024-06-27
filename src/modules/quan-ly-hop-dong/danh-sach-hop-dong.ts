import { Notify } from './../../resources/base/notify';

import { inject } from "aurelia-dependency-injection";
import { DialogService } from "aurelia-dialog";
import { ViewModelBase } from "../../resources/base/viewmodel-base";
import { Filter } from "../../resources/base/filter-base";
import { logger } from "./logger";
import { PLATFORM } from "aurelia-framework";
import { AuthenService } from '../../authen/authenService';
import { HopDong } from "./models/hop-dong";
import { HopDongService, HopDongServiceImpl } from "./services/hop-dong-khach-hang-service";
import { InsertOrUpdateHopDong } from "./dialogs/tao-moi-hop-dong-dialog";
import { KhachHang } from "./models/khach-hang";
// import { KhachHangService, KhachHangServiceImpl } from "./services/khach-hang-service";
import { KhachHangServiceImpl, KhachHangService } from "../quan-ly-khach-hang/services/khach-hang-service";

@inject(HopDongServiceImpl, DialogService, KhachHangServiceImpl)
export class InsertOrViewHopDong implements ViewModelBase {

  selectedItem: any;
  selectedList: any[];

  HieuLuc: [
      { value: 0, name: 'Còn hiệu lực' },
      { value: 1, name: 'hết hiệu lực' }
  ]
  filter: Filter = { skip: 0, limit: 10, where: {} }
  hieuLucControlSelected;
  asyncTask;
  items: HopDong[];
  itemsCount: number
  itemsKhachHang : KhachHang[]
  constructor(
    private hopDongSvr: HopDongService,
    private dialogServices: DialogService,
    private KhachHangSrv: KhachHangService) {
  }

  async activate(params, routeConfig, navigationInstruction) {
    await this.runFilter()
  }

  async paginationChanged(event) {
    await this.runFilter()
  }

  async runFilter() {
    console.log('hieuLucControlSelected', this.hieuLucControlSelected)
    switch (this.hieuLucControlSelected) {
      case '1':
        delete this.filter.where['ngayHetHieuLuc'];
        this.filter.where = Object.assign({}, this.filter.where, { and: [{ "ngayHieuLuc": { "lte": new Date() } }, { "ngayHetHieuLuc": { "gte": new Date() } }] });
        break;
      case '2':
        delete this.filter.where["and"];
        this.filter.where = Object.assign({}, this.filter.where, { "ngayHetHieuLuc": { "lte": new Date() } });
        break;
      default:
        delete this.filter.where['ngayHetHieuLuc'];
        delete this.filter.where["and"];
        break;
    }

    if(this.filter.where["khachHangId"] == -1)
    delete this.filter.where["khachHangId"];

    logger.info('runFilter', this.filter)
    await (this.asyncTask = Promise.all([
        this.hopDongSvr.GetAll(this.filter).then(rec => this.items = rec),
        this.hopDongSvr.GetCount(this.filter).then(rec => this.itemsCount = rec),
        this.KhachHangSrv.GetAllNew().then(rec => this.itemsKhachHang = rec),
    ]))
    logger.info('itemsCount ', this.itemsCount)
  }


  private getName(filePath: string) : string {
    if (filePath == null || filePath === undefined) return "";
    console.log('path   '+ filePath);
    return filePath.split('/').pop()
  }

  getTenbyIdKhachHang(id:number) {
    return this.KhachHangSrv.GetTenKhachHang(id);
  }

  getMabyIdKhachHang(id: string): string {
    var maKH;
    this.itemsKhachHang.forEach(e => {
      if (id == e.id.toString()) {
        maKH = e.ma;
        return ;
      }
    });
    return maKH;
  }

  download(item):void{

    window.open(item, '_blank');

  }

  timerDo(ms = 0) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve(true) }, ms) });
  }

  async runCreate() {
    throw new Error("Method not implemented.");
  }

  async runUpdate(item) {
    this.selectedItem = item;
    this.dialogServices.open({ viewModel: InsertOrUpdateHopDong, model: this.selectedItem }).whenClosed((result) => {
        if (!result.wasCancelled) {
            this.selectedItem = result.output;
            // this.selectedItem.khachHangId = this.khachhangDto.id;
            this.hopDongSvr.Put(this.selectedItem).then(_ => this.runFilter()).catch(err => Notify.alertError(err))
        } else {
            logger.info("Cancel");
        }
    });
    logger.info("runUpdate()", this.selectedItem);
  }


  async runDelete(item) {
    await Notify.alertConfirm(result => {
      if (result) {
      //   this.khachhangDto.dsHopDongIds =  this.khachhangDto.dsHopDongIds.filter(function(el) {
      //     return el.name !== "John";
      // });
      this.hopDongSvr.Delete(item.id).then(_ => this.runFilter())
      }
      else Notify.alertCancel()
  })
  }

  runDeleteMany(ids: any) {
    throw new Error("Method not implemented.");
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

import { STORAGE } from './../../../helpers/storage';
import { Notify } from './../../../resources/base/notify';
import { PLATFORM } from 'aurelia-pal';
import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { InsertOrUpdateHopDong } from './tao-moi-hop-dong-dialog';
import { KhachHang } from '../models/khach-hang';
import { HopDong } from '../models/hop-dong';
import { ViewModelBase } from './../../../resources/base/viewmodel-base';
import { HopDongService, HopDongServiceImpl } from './../services/hop-dong-khach-hang-service';
import { Filter } from './../../../resources/base/filter-base';
import { DialogController, DialogService } from "aurelia-dialog";
import { KhachHangServiceImpl, KhachHangService } from '../services/khach-hang-service';
@inject(DialogController, HopDongServiceImpl, DialogService, KhachHangServiceImpl,STORAGE)

export class InsertOrViewHopDong implements ViewModelBase {
    constructor(private dialogcontroller: DialogController, private hopDongSvr: HopDongService, private dialogServices: DialogService,
      private KhachHangSrv: KhachHangService,private storage: STORAGE) {
      PLATFORM.moduleName('./view-hop-dong-dialog.ts')
    }
    khachhangDto: KhachHang;
    HieuLuc: [
        { value: 0, name: 'Còn hiệu lực' },
        { value: 1, name: 'hết hiệu lực' }
    ]
    filter: Filter = { skip: 0, limit: 10, where: {} }

    hieuLucControlSelected

    private _asyncTask: any;
    public get asyncTask(): any {
        return this._asyncTask;
    };
    public set asyncTask(value: any) {
        this._asyncTask = value;
    };

    private _selectedList: Array<HopDong>;
    public get selectedList(): Array<HopDong> {
        return this._selectedList;
    };
    public set selectedList(value: Array<HopDong>) {
        this._selectedList = value;
    };

    private _selectedItem: HopDong;
    public get selectedItem(): HopDong {
        return this._selectedItem;
    };
    public set selectedItem(value: HopDong) {
        this._selectedItem = value;
    };

    private _items: Array<HopDong>;
    public get items(): Array<HopDong> {
        return this._items;
    };
    public set items(value: Array<HopDong>) {
        this._items = value;
    };

    // private _itemsCount: number;
    // public get itemsCount(): number {
    //     return this._itemsCount;
    // };
    // public set itemsCount(value: number) {
    //     this._itemsCount = value;
    // };

    itemsCount: number

    public runDeleteMany(ids): void {
        throw 'Not Implemented';
    }

    public runUpdate(item): void {
        this.selectedItem = item;
        this.dialogServices.open({ viewModel: InsertOrUpdateHopDong, model: this.selectedItem }).whenClosed((result) => {
            if (!result.wasCancelled) {
                this.selectedItem = result.output;
                this.selectedItem.khachHangId = this.khachhangDto.id;
                this.hopDongSvr.Put(this.selectedItem).then(_ => this.runFilter()).catch(err => Notify.alertError(err))
            } else {
                logger.info("Cancel");
            }
        });
        logger.info("runUpdate()", this.selectedItem);
    }

    async runDelete(item) {
        logger.info("runDelete()", this.selectedItem)
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

    public runCreate(): void {
        this.selectedItem = new HopDong();
        this.selectedItem.khachHangId = this.khachhangDto.id;
        logger.info("runCreate HopDong()", this.selectedItem);
        // if(this.khachhangDto.dsHopDongIds === null || this.khachhangDto.dsHopDongIds === undefined){
          // this.khachhangDto.dsHopDongIds = new Array<number>();
        // }
        this.dialogServices.open({ viewModel: InsertOrUpdateHopDong, model: this.selectedItem }).whenClosed((result) => {
            if (!result.wasCancelled) {
                this.selectedItem = result.output;
                // this.khachhangDto.dsHopDongIds.push(this.selectedItem.id);
                logger.info("dsHopDongIds",  this.khachhangDto.dsHopDongIds)
                // this.KhachHangSrv.Patch(this.khachhangDto);
                this.selectedItem.khachHangId = this.khachhangDto.id;
                this.hopDongSvr.Post(this.selectedItem).then(_ => this.runFilter()).catch(err => Notify.alertError(err))
            } else {
                logger.info("Cancel");
            }
        });
        logger.info("runCreate()", this.selectedItem);
    }

    async runFilter() {
        // if(this.filter.where.ngayHetHieuLuc != -1)  {
        //     if(this.filter.where.ngayHetHieuLuc == undefined || this.filter.where.ngayHetHieuLuc == 1 )
        //         this.filter.where.ngayHetHieuLuc={lt:Date.now()}
        //     else
        //         this.filter.where.ngayHetHieuLuc={gt:Date.now()}
        // }
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

        logger.info('runFilter', this.filter)
        await (this.asyncTask = Promise.all([
            this.hopDongSvr.GetAll(this.filter).then(rec => this.items = rec),
            this.hopDongSvr.GetCount(this.filter).then(rec => this.itemsCount = rec),
        ]))
        logger.info('itemsCount ', this.itemsCount)
    }
    async activate(itemKhachHang: KhachHang) {
        this.khachhangDto = itemKhachHang;
        this.filter.where.khachHangId = itemKhachHang.id;
        this.itemsCount = 0;
        await this.runFilter();

    }

    private getName(filePath: string) : string {
        if (filePath == null || filePath === undefined) return "";
        console.log('path   '+ filePath);
        return filePath.split('/').pop()
    }

    download(item):void{
      //console.log("viet item.fileHopDong=",item);
      let token = this.storage.get(STORAGE.tokenKey);
      let urlDownload= item + '?access_token=' + token;

      window.open(urlDownload, '_blank');

    }


    async paginationChanged(event) {
        await this.runFilter()
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

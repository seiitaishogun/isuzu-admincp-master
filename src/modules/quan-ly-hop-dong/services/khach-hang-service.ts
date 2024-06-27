import { logger } from './../../../authen/logger';
import { KhachHang } from './../models/khach-hang';
import { Filter } from './../../../resources/base/filter-base';
import { BaseService } from './../../../resources/base/service-base';
import axios from 'axios';


export interface KhachHangService extends BaseService {
  GetByIds(ListId: Array<number>) : Promise<KhachHang[]>

  Patch(item): Promise<KhachHang>

  GetAllNew(filter?: Filter): Promise<Array<any>>
  GetCountNew(filter?: Filter): Promise<number>
  GetTenKhachHang(khachhangId : number) : string
}
export class KhachHangServiceImpl implements KhachHangService {
  SaveHistory(objectId: string, message: string, note: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  GetHistories(objectId: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  async GetCount(filter?: Filter): Promise<number> {
    let rec = await axios.get("/api/KhachHangs/count", {
      params: { filter: filter.where }
    });
    return rec.data.count;
  }
  async GetAll(filter?: Filter): Promise<any> {
    let rec = await axios.get("/api/KhachHangs", {
      params: { filter: filter }
    });
    return rec.data;
  }

  async GetCountNew(filter?: Filter): Promise<number> {
    if (filter === null || filter === undefined) {
      filter = {}; //khởi tạo nếu ch[a có giá trị 
    }

    Object.assign({}, filter);
    let filter1: Filter = Object.assign({}, filter);  //kế thừa toàn bộ skip, limit, order ... từ filter cũ
    filter1.where = {}; //xóa giá trị where


    filter1.where['and'] = [];
    filter1.where['and'].push(filter.where);
    filter1.where['and'].push({"trangThai": "ACTIVE"});

    return this.GetCount(filter1)
  }

  async GetAllNew(filter?: Filter): Promise<any> {

    if (filter === null || filter === undefined) {
      filter = {}; //khởi tạo nếu ch[a có giá trị 
    }

    Object.assign({}, filter);
    let filter1: Filter = Object.assign({}, filter);  //kế thừa toàn bộ skip, limit, order ... từ filter cũ
    filter1.where = {}; //xóa giá trị where


    filter1.where['and'] = [];
    filter1.where['and'].push(filter.where);
    filter1.where['and'].push({"trangThai": "ACTIVE"});

    return this.GetAll(filter1)

  }

  async Get(id: number): Promise<KhachHang> {
    let recKhachHang = await axios.get("/api/KhachHangs/" + id);
    return recKhachHang.data;
  }

  async Patch(item): Promise<KhachHang> {
    let rec = await axios.patch("/api/KhachHangs/" + item.id, item);
    return rec.data;
  }

  async GetByIds(ListId: Array<number>) : Promise<KhachHang[]>{
    if (ListId === null || ListId.length <= 0) {
        return new Array<KhachHang>();  //
    }
    
    let filter = { where: { } }; 


    filter.where["or"] = [];
    
    ListId.forEach(element => {
      filter.where["or"].push({"id" : element})
    });
    
    logger.info('GetByListIds() this.filter.where["or"] ' , filter.where["or"]);
    let recNhanViens = await axios.get('api/KhachHangs', {
      params: { filter: filter }
    })
    return recNhanViens.data
  }

  async Post(item: KhachHang): Promise<KhachHang> {
    let rec = await axios.post("/api/KhachHangs", item);
    return rec.data;
  }

  async Put(item: KhachHang): Promise<KhachHang> {
    let rec = await axios.put("/api/KhachHangs/" + item.id, item);
    return rec.data;
  }
  async Delete(id: number): Promise<any> {
    let rec = await axios.delete("/api/KhachHangs/" + id);
    return rec.data;
  }

  async DeleteMany(ids: Array<number>): Promise<any> {
    let tasks = ids.map(id => this.Delete(id))
    return await Promise.all(tasks);
  }
  constructor() {
    this.GetAll().then(ds => this.itemsKhachHang = ds);
  }
  async updateDsKhachHang() {
    this.GetAll().then(ds => this.itemsKhachHang = ds);
  }
  private itemsKhachHang : KhachHang[] = new Array<KhachHang>();
  GetTenKhachHang(khachhangId : number) {
      var ten = '';
      this.itemsKhachHang.forEach(e3 => {
        if (khachhangId == e3.id) {
          ten = e3.hoTen;
          return;
        }
      });
      return ten;
  }
}


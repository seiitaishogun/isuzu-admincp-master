import { Common } from './../../../resources/module/common';
import { logger } from './../../../authen/logger';
import { KhachHang } from './../models/khach-hang';
import { HopDong } from './../models/hop-dong';
import { Attachment } from './../models/attachment-hop-dong';
import { Filter } from './../../../resources/base/filter-base';
import { BaseService } from './../../../resources/base/service-base';
import axios from 'axios';


export interface HopDongService extends BaseService {

}
export class HopDongServiceImpl implements HopDongService {
  SaveHistory(objectId: string, message: string, note: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  GetHistories(objectId: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  async GetCount(filter?: Filter): Promise<number> {
    let rec = await axios.get("/api/HopDongs/count", {
      params: { where: filter.where }
    });
    return rec.data.count;
  }
  // async GetAll(filter?: Filter): Promise<any> {
  //   let rec = await axios.get("/api/HopDongs", {
  //     params: { filter: filter }
  //   });
  //   let data = rec.data;
  //   // if(!data.ngayHieuLuc)
  //   //   data.ngayHieuLuc = new Date(data.ngayHieuLuc);
  //   // if(!data.ngayHetHieuLuc)
  //   //   data.ngayHieuLuc = new Date(data.ngayHetHieuLuc);
  //   // if(!data.ngayKy)
  //   //   data.ngayHieuLuc = new Date(data.ngayKy);
  //   return data;
  // }
  async GetAll(filter?: Filter): Promise<any> {
    let rec = await axios.get("/api/HopDongs", {
      params: { filter: filter }
    });
    return rec.data;
  }
  async Get(id: number): Promise<HopDong> {
    let recHopDong = await axios.get("api/HopDongs", {
      params: { id: id }
    });
    return recHopDong.data;
  }

  async Post(item: HopDong): Promise<HopDong> {
    // if(item.fileHopDong.length>0)
    // {
    //   let result = await this.Attachment(item).then(value =>{
    //     console.log(value)
    //     item.fileHopDong = value.result.files.file[0].name;
    //   });
    // }
    // else
    //   item.fileHopDong = '';
    console.log("tạo mới hợp đồng");
    let commonDate = new Common.ParseDate();
    if(item.ngayKy && typeof(item.ngayKy)=="string")
      item.ngayKy = commonDate.StringToDate(item.ngayKy);
    if(item.ngayHetHieuLuc && typeof(item.ngayHetHieuLuc)=="string")
      item.ngayHetHieuLuc = commonDate.StringToDate(item.ngayHetHieuLuc);
    if(item.ngayHieuLuc && typeof(item.ngayHieuLuc)=="string")
      item.ngayHieuLuc = commonDate.StringToDate(item.ngayHieuLuc);

    let rec = await axios.post("/api/HopDongs", item);
    return rec.data;
  }

  async Put(item: HopDong): Promise<HopDong> {
    
    // if(item.fileHopDongDelete!=undefined)
    //   {
    //     let check = await this.CheckExistsFiles(item.khachHangId,item.fileHopDongDelete).then(value=>{
    //       let result = this.DeleteFile(item.fileHopDongDelete,item.khachHangId);
    //     });
    //   }
    // if(typeof(item.fileHopDong) == "object" && item.fileHopDong.length>0)
    // {
    //   let result = await this.Attachment(item).then(value =>{
    //     item.fileHopDong = value.result.files.file[0].name;
    //   });
    // }
    console.log(item.fileHopDong)
    let rec = await axios.put("/api/HopDongs/" + item.id, item);
    return rec.data;
  }
  async Patch(item: HopDong): Promise<HopDong> {
    
    // if(item.fileHopDongDelete!=undefined)
    //   {
    //     let check = await this.CheckExistsFiles(item.khachHangId,item.fileHopDongDelete).then(value=>{
    //       let result = this.DeleteFile(item.fileHopDongDelete,item.khachHangId);
    //     });
    //   }
    // if(typeof(item.fileHopDong) == "object" && item.fileHopDong.length>0)
    // {
    //   let result = await this.Attachment(item).then(value =>{
    //     item.fileHopDong = value.result.files.file[0].name;
    //   });
    // }
    console.log(item.fileHopDong)
    let rec = await axios.patch("/api/HopDongs/" + item.id, item);
    return rec.data;
  }
  async Delete(id: number): Promise<any> {
    let rec = await axios.delete("/api/HopDongs/" + id);
    return rec.data;
  }

  async DeleteMany(ids: Array<number>): Promise<any> {
    let tasks = ids.map(id => this.Delete(id))
    return await Promise.all(tasks);
  }

  async Attachment(item: HopDong):Promise<any>{
    
    var check = await this.CheckExistsContainer(item.khachHangId);
    console.log(check)
    let att = await axios.post("/api/HopDongContainers/"+check.name+"/upload",this.ProgessFileAttachment(item.fileHopDong), {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
     return att.data;
    
  }

  private async CheckExistsContainer(id:number):Promise<any>{
    let exists = await axios.get("/api/HopDongContainers/container"+id).then(exists=> {
      return exists.data
    },async function (){
      let create = await axios.post("/api/HopDongContainers",{name:"container"+id});
      return create.data;
    });
    return exists
  }

  private async CheckExistsFiles(id:number,fileName:string):Promise<any>{
    let exists = await axios.get("/api/HopDongContainers/container"+id+"/files/"+fileName);
    return exists.data;
  }

  public async CreateContainer(id:number):Promise<any>{
    let create = await axios.post("/api/HopDongContainers",{name:"container"+id});
    return create.data;
  }

  private async DeleteFile(name:string,id:number):Promise<any>{
    let exists = await axios.delete("/api/HopDongContainers/container"+id+"/files/"+name);
    return exists.data;
  }

  private ProgessFileAttachment(item:any):FormData
  {
    let formData = new FormData();
    if (item.length<=0) {
      return formData;
    }
    
    for (let i = 0; i < item.length; i++) {
        formData.append('file', item[i]);
    }
    
    return formData;
  }
}


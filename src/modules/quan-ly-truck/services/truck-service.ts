import { Truck } from '../models/truck';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface TruckService extends BaseService {
    GetAllTrucks(filter?: Filter): Promise<Array<any>>;
    findExist(postId: number): Promise<Array<any>>;

}
export class TruckServiceImpl implements TruckService {

  

  public DeleteMany(Ids: Array<number>): Promise<any> {
    throw 'Not Implemented';
  }

  public async Delete(id: number): Promise<any> {
    let rec = await axios.delete('api/Trucks/' + id)
    return rec.data
  }

  public async Put(item): Promise<Truck> {
    let rec = await axios.put('api/Trucks/' + item.id, item)
    return rec.data
  }
  public async Patch(item): Promise<Truck> {
    let rec = await axios.patch('api/Trucks/' + item.id, item)
    return rec.data
  }

  public async Post(item): Promise<Truck> {
    let rec = await axios.post('api/Trucks/', item)
    return rec.data
  }

  public async GetCount(filter?: Filter): Promise<number> {
    let rec = await axios.get('api/Trucks/count', {
      params: { filter: filter.where }
    })
    return rec.data.count
  }

  public async GetAll(filter?: Filter): Promise<Array<Truck>> {
    let rec = await axios.get('api/WpPosts/getAllSanPhamXeTai', {
      params: { filter: filter }
    })
    return rec.data.items
  }

  public async GetAllTrucks(filter?: Filter): Promise<Array<any>> {
    let rec = await axios.get('api/Trucks', {
      params: { filter: filter }
    })
    return rec.data
  }

  public async findExist(postId: number): Promise<Array<any>> {
    try {
      if (!postId) return [];
      let rec = await axios.get("/api/Trucks/", { params: { filter: { fields: { id: true }, where: { postId: postId } } } });
      // console.log('findExist rec', rec);
      return rec.data;
    } catch (error) {
      console.log('err', error);
    }
  }




  filter = {
    where: {
    }
  }

  public async GetByListIds(ListId: Array<number>): Promise<Truck[]> {
    var dsBarcode = new Array<Truck>();
    if (ListId === null || ListId.length <= 0) {
      return dsBarcode;
    }
    this.filter.where["or"] = [];
    ListId.forEach(element => {
      this.filter.where["or"].push({ "id": element })
    });

    let rec = await axios.get('api/Trucks', {
      params: { filter: this.filter }
    })
    return rec.data
  }

  public async Get(id: number): Promise<Truck> {
    let rec = await axios.get("/api/Trucks/" + id);
    return rec.data;
  }
}

import { LCV } from '../models/lcv';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface LCVService extends BaseService {
  GetAllLCVs(filter?: Filter): Promise<Array<any>>;
  findExist(postId: number): Promise<Array<any>>;

}
export class LCVServiceImpl implements LCVService {
   
  

    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Lcvs/' + id)
        return rec.data
    }

    public async Put(item): Promise<LCV> {
        let rec = await axios.put('api/Lcvs/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<LCV> {
        let rec = await axios.patch('api/Lcvs/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<LCV> {
        let rec = await axios.post('api/Lcvs/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Lcvs/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<LCV>> { 
        let rec = await axios.get('api/WpPosts/getAllSanPhamXeBanTai', {
            params: { filter: filter }
        })
        return rec.data.items
    }

    public async GetAllLCVs(filter?: Filter): Promise<Array<any>> {
      let rec = await axios.get('api/Lcvs', {
        params: { filter: filter }
      })
      return rec.data
    }
  
    public async findExist(postId: number): Promise<Array<any>> {
      try {
        if (!postId) return [];
        let rec = await axios.get("/api/Lcvs/", { params: { filter: { fields: { id: true }, where: { postId: postId } } } });
        // console.log('findExist rec', rec);
        return rec.data;
      } catch (error) {
        console.log('err', error);
      }
    }
  

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<LCV[]>{
      var dsBarcode = new Array<LCV>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/LCVs', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<LCV> {
      let rec = await axios.get("/api/LCVs/" + id);
      return rec.data;
    }
}

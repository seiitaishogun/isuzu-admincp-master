import { Banner } from '../models/banner';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface BannerService extends BaseService {
    

}
export class BannerServiceImpl implements BannerService {
   
  

    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Banners/' + id)
        return rec.data
    }

    public async Put(item): Promise<Banner> {
        let rec = await axios.put('api/Banners/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<Banner> {
        let rec = await axios.patch('api/Banners/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<Banner> {
        let rec = await axios.post('api/Banners/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Banners/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<Banner>> {
        let rec = await axios.get('api/Banners', {
            params: { filter: filter }
        })
        return rec.data
    }

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<Banner[]>{
      var dsBarcode = new Array<Banner>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/Banners', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<Banner> {
      let rec = await axios.get("/api/Banners/" + id);
      return rec.data;
    }
}

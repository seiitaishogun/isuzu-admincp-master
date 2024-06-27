import { Accessory } from '../models/accessory';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface AccessoryService extends BaseService {
    

}
export class AccessoryServiceImpl implements AccessoryService {
   
  

    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Accessories/' + id)
        return rec.data
    }

    public async Put(item): Promise<Accessory> {
        let rec = await axios.put('api/Accessories/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<Accessory> {
        let rec = await axios.patch('api/Accessories/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<Accessory> {
        let rec = await axios.post('api/Accessories/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Accessories/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<Accessory>> {
        let rec = await axios.get('api/Accessories', {
            params: { filter: filter }
        })
        return rec.data
    }

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<Accessory[]>{
      var dsBarcode = new Array<Accessory>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/Accessories', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<Accessory> {
      let rec = await axios.get("/api/Accessories/" + id);
      return rec.data;
    }
}

import { Barcode } from '../models/barcode';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface BarcodeService extends BaseService {
    

}
export class BarcodeServiceImpl implements BarcodeService {
   
  

    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Products/' + id)
        return rec.data
    }

    public async Put(item): Promise<Barcode> {
        let rec = await axios.put('api/Products/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<Barcode> {
        let rec = await axios.patch('api/Products/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<Barcode> {
        let rec = await axios.post('api/Products/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Products/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<Barcode>> {
        let rec = await axios.get('api/Products', {
            params: { filter: filter }
        })
        return rec.data
    }

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<Barcode[]>{
      var dsBarcode = new Array<Barcode>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/Products', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<Barcode> {
      let rec = await axios.get("/api/Products/" + id);
      return rec.data;
    }
}

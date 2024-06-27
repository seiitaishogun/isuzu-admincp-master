import { Testdrive } from '../models/testdrive';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface TestdriveService extends BaseService {
    

}
export class TestdriveServiceImpl implements TestdriveService {
   
  

    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Testdrives/' + id)
        return rec.data
    }

    public async Put(item): Promise<Testdrive> {
        let rec = await axios.put('api/Testdrives/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<Testdrive> {
        let rec = await axios.patch('api/Testdrives/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<Testdrive> {
        let rec = await axios.post('api/Testdrives/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Testdrives/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<Testdrive>> {
        let rec = await axios.get('api/Testdrives', {
            params: { filter: filter }
        })
        return rec.data
    }

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<Testdrive[]>{
      var dsBarcode = new Array<Testdrive>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/Testdrives', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<Testdrive> {
      let rec = await axios.get("/api/Testdrives/" + id);
      return rec.data;
    }
}

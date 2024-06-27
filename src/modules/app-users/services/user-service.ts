import { AppUser } from '../models/user';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface AppUserService extends BaseService {
    

}
export class AppUserServiceImpl implements AppUserService {
   
  

    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/AppUsers/' + id)
        return rec.data
    }

    public async Put(item): Promise<AppUser> {
        let rec = await axios.put('api/AppUsers/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<AppUser> {
        let rec = await axios.patch('api/AppUsers/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<AppUser> {
        let rec = await axios.post('api/AppUsers/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/AppUsers/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<AppUser>> {
        let rec = await axios.get('api/AppUsers', {
            params: { filter: filter }
        })
        return rec.data
    }

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<AppUser[]>{
      var dsBarcode = new Array<AppUser>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/AppUsers', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<AppUser> {
      let rec = await axios.get("/api/AppUsers/" + id);
      return rec.data;
    }
}

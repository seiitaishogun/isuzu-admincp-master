import { Contact } from '../models/contact';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface ContactService extends BaseService {
    

}
export class ContactServiceImpl implements ContactService {
   
  

    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Contacts/' + id)
        return rec.data
    }

    public async Put(item): Promise<Contact> {
        let rec = await axios.put('api/Contacts/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<Contact> {
        let rec = await axios.patch('api/Contacts/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<Contact> {
        let rec = await axios.post('api/Contacts/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Contacts/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<Contact>> {
        let rec = await axios.get('api/Contacts', {
            params: { filter: filter }
        })
        return rec.data
    }

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<Contact[]>{
      var dsBarcode = new Array<Contact>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/Contacts', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<Contact> {
      let rec = await axios.get("/api/Contacts/" + id);
      return rec.data;
    }
}

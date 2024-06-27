import { Dealer } from '../models/dealer';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface DealerService extends BaseService {
  GetAllDealers(filter?: Filter): Promise<Array<any>>;
  findExist(postId: number): Promise<Array<any>>;

}
export class DealerServiceImpl implements DealerService {
    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Dealer2s/' + id)
        return rec.data
    }

    public async Put(item): Promise<Dealer> {
        let rec = await axios.put('api/Dealer2s/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<Dealer> {
        let rec = await axios.patch('api/Dealer2s/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<Dealer> {
        let rec = await axios.post('api/Dealer2s/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Dealer2s/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<Dealer>> {
        let rec = await axios.get('api/WpPosts/getAllDaiLy2', { 
            params: { filter: filter }
        })
        return rec.data.items
    }

    public async GetAllDealers(filter?: Filter): Promise<Array<any>> {
      let rec = await axios.get('api/Dealer2s', {
        params: { filter }
      })
      return rec.data
    }
  
    public async findExist(postId: number): Promise<Array<any>> {
      try {
        if (!postId) return [];
        let rec = await axios.get("/api/Dealer2s/", { params: { filter: { fields: { id: true }, where: { postId: postId } } } });
        // console.log('findExist rec', rec);
        return rec.data;
      } catch (error) {
        console.log('err', error);
      }
    }

    
    filter = {  where: {
    } }

    public async GetByListIds(ListId: Array<number>) : Promise<Dealer[]>{
      var dsBarcode = new Array<Dealer>();
      if (ListId === null || ListId.length <= 0) {
          return dsBarcode;  
      }
      this.filter.where["or"] = [];
      ListId.forEach(element => {
        this.filter.where["or"].push({"id" : element})
      });
      
      let rec = await axios.get('api/Dealer2s', {
        params: { filter: this.filter }
      })
      return rec.data
    }

    public async Get(id: number): Promise<Dealer> {
      let rec = await axios.get("/api/Dealer2s/" + id);
      return rec.data;
    }
}

import { WarrantyModel } from './../models/warranty.model';
import { Filter } from '../../../resources/base/filter-base';
import axios from 'axios';

export class WarrantyService {
  async Delete(id: number): Promise<any> {
    let rec = await axios.delete('https://isuzucare.isuzu-vietnam.com/api/Warranties' + id)
    return rec.data;
  }

  async Patch(item): Promise<WarrantyModel> {
    let rec = await axios.patch('https://isuzucare.isuzu-vietnam.com/api/Warranties/' + item.id, item)
    return rec.data;
  }

  async Post(item): Promise<WarrantyModel> {
    let rec = await axios.post('https://isuzucare.isuzu-vietnam.com/api/Warranties', item)
    return rec.data;
  }
  
  async GetCount(filter?: Filter): Promise<number> {
    let rec = await axios.get('https://isuzucare.isuzu-vietnam.com/api/Warranties/count', {
      params: { where: filter.where }
    })
    return rec.data.count;
  }

  async GetAll(filter?: Filter): Promise<Array<WarrantyModel>> {
    let rec = await axios.get('https://isuzucare.isuzu-vietnam.com/api/Warranties', {
      params: { filter: filter }
    })
    
    return rec.data;
  }

  async GetById(id: number): Promise<WarrantyModel> {
    let rec = await axios.get('https://isuzucare.isuzu-vietnam.com/api/Warranties/' + id);
    return rec.data;;
  }
}

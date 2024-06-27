import { RequestUserIdModel } from './../models/request-user-id.model';
import { Filter } from '../../../resources/base/filter-base';
import axios from 'axios';

export class RequestUserIdService {
  async Delete(id: number): Promise<any> {
    let rec = await axios.delete('api/IdRequests' + id)
    return rec.data;
  }

  async Patch(item): Promise<RequestUserIdModel> {
    let rec = await axios.patch('api/IdRequests/' + item.id, item)
    return rec.data;
  }

  async Post(item): Promise<RequestUserIdModel> {
    let rec = await axios.post('api/IdRequests', item)
    return rec.data;
  }

  async GetCount(filter?: Filter): Promise<number> {
    let rec = await axios.get('api/IdRequests', {
      params: { filter: filter }
    })
    return rec.data.count;
  }

  async GetAll(filter?: Filter): Promise<RequestUserIdModel[]> {
    let rec = await axios.get('api/IdRequests', {
      params: { filter: filter }
    })
    
    return rec.data;
  }

  async GetById(id: number): Promise<RequestUserIdModel> {
    let rec = await axios.get('api/IdRequests' + id);
    return rec.data;;
  }
  
}

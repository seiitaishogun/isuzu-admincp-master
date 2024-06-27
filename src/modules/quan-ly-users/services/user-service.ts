import axios from 'axios';
import { Filter } from '../../../resources/base/filter-base';
import { UserModel } from '../models/user-model';

export class UserServices {
    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/CmsUsers/' + id)
        return rec.data
    }

    public async Put(item): Promise<UserModel> {
        let rec = await axios.put('api/CmsUsers/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<UserModel> {
        let rec = await axios.patch('api/CmsUsers/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<UserModel> {
        let rec = await axios.post('api/CmsUsers/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/CmsUsers/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<UserModel>> {
        let rec = await axios.get('api/CmsUsers', {
            params: { filter: filter }
        })
        return rec.data
    }

    public async Get(id: number): Promise<UserModel> {
        let rec = await axios.get("/api/CmsUsers/" + id);
        return rec.data;
    }
}

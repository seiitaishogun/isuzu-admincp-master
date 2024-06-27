import { Filter } from './../../../resources/base/filter-base';
import axios from 'axios';
import { NEWS } from '../models/news';
import { readConfigFile } from 'typescript';
export class NEWSServices {
    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/News/' + id)
        return rec.data
    }

    public async Put(item): Promise<NEWS> {
        let rec = await axios.put('api/News/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<NEWS> {
        let rec = await axios.patch('api/News/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<NEWS> {
        let rec = await axios.post('api/News/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/News/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAll(filter?: Filter): Promise<Array<NEWS>> {
        let rec = await axios.get('api/WpPosts/getAllTinTuc', {
            params: { filter: filter }
        })
        return rec.data.items
    }
    public async GetAllNews(filter?: Filter): Promise<Array<any>> {
        let rec = await axios.get('api/News', { 
            params: { filter: filter }
        })
        return rec.data
    }

    public async Get(id: number): Promise<NEWS> {
        let rec = await axios.get("/api/News/" + id);
        return rec.data;
    }

    public async findExist(postId: number): Promise<Array<any>> {
        try {
            if(!postId) return [];
            let rec = await axios.get("/api/News/", { params: { filter: { fields: { id: true }, where: { postId: postId } } } });
            // console.log('findExist rec', rec);
            return rec.data;
        } catch (error) {
            console.log('err', error);
        }
    }
}

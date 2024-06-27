import { SPV } from '../models/spv';
import { element } from 'aurelia-protractor-plugin/protractor';
import { Filter } from '../../../resources/base/filter-base';
import { BaseService } from '../../../resources/base/service-base';
import axios from 'axios';
export interface SPVService extends BaseService {
  GetAllSPVs(filter?: Filter): Promise<Array<SPV>>;
    findExist(postId: number): Promise<Array<any>>;
}
export class SPVServiceImpl implements SPVService {
    public async findExist(postId: number): Promise<Array<any>> {
        try {
            if (!postId) return [];
            let rec = await axios.get("/api/Spvs/", { params: { filter: { fields: { id: true }, where: { postId: postId } } } });
            // console.log('findExist rec', rec);
            return rec.data;
        } catch (error) {
            console.log('err', error);
        }
    }


    public DeleteMany(Ids: Array<number>): Promise<any> {
        throw 'Not Implemented';
    }

    public async Delete(id: number): Promise<any> {
        let rec = await axios.delete('api/Spvs/' + id)
        return rec.data
    }

    public async Put(item): Promise<SPV> {
        let rec = await axios.put('api/Spvs/' + item.id, item)
        return rec.data
    }
    public async Patch(item): Promise<SPV> {
        let rec = await axios.patch('api/Spvs/' + item.id, item)
        return rec.data
    }

    public async Post(item): Promise<SPV> {
        let rec = await axios.post('api/Spvs/', item)
        return rec.data
    }

    public async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('api/Spvs/count', {
            params: { filter: filter.where }
        })
        return rec.data.count
    }

    public async GetAllSPVs(filter?: Filter): Promise<Array<SPV>> {
        let rec = await axios.get('api/Spvs', {
            params: { filter: filter }
        })
        return rec.data;
    }

    public async GetAll(filter?: Filter): Promise<Array<SPV>> {
        // get from api wpposts
        let rec = await axios.get('api/WpPosts/getAllSanPhamXeChuyenDung', {
            params: { filter: filter }
        })
        return rec.data.items
    }

    filter = {
        where: {
        }
    }

    public async GetByListIds(ListId: Array<number>): Promise<SPV[]> {
        var dsBarcode = new Array<SPV>();
        if (ListId === null || ListId.length <= 0) {
            return dsBarcode;
        }
        this.filter.where["or"] = [];
        ListId.forEach(element => {
            this.filter.where["or"].push({ "id": element })
        });

        let rec = await axios.get('api/Spvs', {
            params: { filter: this.filter }
        })
        return rec.data
    }

    public async Get(id: number): Promise<SPV> {
        let rec = await axios.get("/api/Spvs/" + id);
        return rec.data;
    }
}

import { RequestUserIdModel } from './../models/request-user-id.model';
import { Filter } from '../../../resources/base/filter-base';
import axios from 'axios';
export class NotificationService {
    async getTokenForSendNoti(userId: number): Promise<string> {
        let token: string = '';
        return token;
    }

    async sendPushNoti_Specific_Device(title: string, body: string, token: string) {
        let URL = 'api/UserDeviceTokens/sendPushNoti_Specific_Device';

        // let result = await axios.post(`${URL}?title=${encodeURI(title)}?body=${encodeURI(body)}?token=${encodeURI(token)}`);
        let result = await axios.post(URL, {
            title: title,
            body: body,
            token: token
        })

    }

    async getDeviceInfoByUserId(userId: number): Promise<any> {
        const filter: Filter = {
            where: {
                userId: userId
            }
        }
        try {
            let result = await axios.get('api/UserDeviceTokens', { params: { filter: filter } });
            return result;
        } catch (error) {
            console.log(error);

        }
    }

    async Delete(id: number): Promise<any> {
        let rec = await axios.delete('/api/Notifications/' + id)
        return rec.data;
    }

    async Patch(item): Promise<RequestUserIdModel> {
        let rec = await axios.patch('/api/Notifications/' + item.id, item)
        return rec.data;
    }

    async Post(item): Promise<RequestUserIdModel> {
        let rec = await axios.post('/api/Notifications', item)
        return rec.data;
    }

    async GetCount(filter?: Filter): Promise<number> {
        let rec = await axios.get('/api/Notifications/count', {
            params: { where: filter.where }
        })
        console.log('getcount rec', rec);
        
        return rec.data.count;
    }

    async GetAll(filter?: Filter): Promise<RequestUserIdModel[]> {
        let rec = await axios.get('/api/Notifications', {
            params: { filter: filter }
        })

        return rec.data;
    }

    async GetById(id: number): Promise<RequestUserIdModel> {
        let rec = await axios.get('/api/Notifications' + id);
        return rec.data;;
    }

}

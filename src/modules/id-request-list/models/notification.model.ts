export class NotificationModel {
    id?: number;
    phoneNumber: string;
    title: string;
    content: string;
    category: string;
    status: string;
    
    requestTime: string;
    userId: string;
    clientId: string;
    message: string;
    replyTime: Date;
    staffId: number;
}
export class RequestUserIdModel {
  id?: number;
  userId: number;
  
  phoneNumber: string;
  requestTime: Date;
  status: string;

  reply_clientId_IVC: string;
  reply_title: string;
  reply_message: string;
  replyTime: Date;

  constructor() { }
}

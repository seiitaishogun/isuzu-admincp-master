export class SPV {
  id: number;
  postId: number;
  language: string;
  spv_cat_level_0: string;
  spv_cat_level_1: string;
  spv_cat_level_2: string;
  postDateGmt: Date;
  isSync: boolean;
  spv_detail: any;
  postStatus: string;
  constructor() {
    this.spv_detail = {gallery:[]}
    this.language = 'vn';
    this.postStatus = 'publish';
  }
}





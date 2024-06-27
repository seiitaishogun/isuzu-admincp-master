import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value) {
      if(value)
        {
          if(typeof value != "object" && (value.split('/')).length>1)
          {
            let from = value.split('/');
            let newDate =  new Date([from[2],from[1],from[0]].join('/'));
            return moment(newDate).format('DD/MM/YYYY');
          }
          else
            return moment(value).format('DD/MM/YYYY');
        }
  }
}

export class DateTimeFormatValueConverter {
  toView(value) {
      if(value)
        {
          if(typeof value != "object" && (value.split('/')).length>1)
          {
            let from = value.split('/');
            let newDate =  new Date([from[2],from[1],from[0]].join('/'));
            return moment(newDate).format('DD/MM/YYYY HH:mm');
          }
          else
            return moment(value).format('DD/MM/YYYY HH:mm');
        }
  }
}

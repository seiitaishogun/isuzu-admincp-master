import * as moment from 'moment';

export class EasyFormatDate {

    public static ToShortDate(date : Date) {
      return moment(date).format('DD/MM/YYYY');
    }

    public static ToDate(date : Date) {
      return moment(date).format('DD/MM/YYYY HH:mm');
    }

    public static ToFullTime(date : Date) {
      return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
}

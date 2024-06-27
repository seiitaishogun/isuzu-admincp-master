import { element } from 'aurelia-protractor-plugin/protractor';
import * as moment from 'moment';
export module Common{
    export class ParseDate{
        dat:string;
        format:string;
        constructor(dat:string = ''){
            this.dat = dat;
            this.format = "DD/MM/YYYY";
        }
        StringToDate(dat:string = this.dat):Date{
            if(dat)
                return new Date(this.StringToISO(dat));
            else
                return null;
        }
        StringToISO(dat:string = this.dat):string{
            if(!dat)
                return null;
            if(moment(dat,this.format).isValid())
                return moment.utc(dat,this.format).toISOString();
            else 
                return moment.utc(dat).toISOString();
        }
    }
}
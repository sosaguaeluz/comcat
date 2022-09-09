import moment from "moment";
import "moment/locale/pt-br";

export function convertDate(date: string | number | Date) {
    return moment(date).utc(true).format("DD/MM/YYYY - HH:mm");
}

export function setDefaultData(date: any){
    return moment(date).utc(true).format('YYYY-MM-DDTHH:mm')
}

export function extractDate(date: string){
    return moment(date).utc(true).format('DD-MM-YYYY')
}

export function extractHours(date: string){
    return moment(date).utc(true).format('HH:mm')
}
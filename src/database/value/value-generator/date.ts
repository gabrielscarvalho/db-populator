import DataRowCol from "../../../data/data-row-col";
import moment from 'moment';
import Exception from "../../../exceptions/exception";

export const DateIncrement: Function = (initialDate: Date, amountOfDays: number) => {

    return (lastDate: DataRowCol) => {

        let date: Date = initialDate;

        if (lastDate != undefined && lastDate.val != null) {
            date = lastDate.val;
        }

        if (moment(date).isValid()) {
            return moment(date).add(amountOfDays, 'days').calendar();
        }


        const exc: Exception = new Exception('Invalid date param');
        if (lastDate != undefined) {
            exc.prop(lastDate.column.table.name, lastDate.column.identifier, 'val');
        }
        exc.throw();
    }
}



export const date = (date: string, parseFormat: string = "YYYY-MM-DD") => {
    return moment(date, parseFormat);
}

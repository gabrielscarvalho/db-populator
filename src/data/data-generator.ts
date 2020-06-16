import Table from "../database/table";
import DataRow from "./data-row";
import QueryCommand from "../query/query-command";
import Column, { NamedColumn } from "../database/column";
import DataRowCol from "./data-row-col";
import Value from "../database/value";
import Logger from "../commons/logger";


const log = new Logger();
export class DataGenerator {

    constructor(protected table: Table, public queryCommand: QueryCommand) {

    }

    execute(extraData: object = {}): DataRow {
        log.group(`Generating data for table: [${this.table.name}]...`);
        const dataRow: DataRow = new DataRow(this.table, this.queryCommand);

        this.table.getColumns().forEach(column => {            
            let val: any;
            log.info(`Generating for table:[${this.table.name}] column:[${column.identifier}]...`);
            
            let previousVal : DataRowCol = this.getPreviousDataRowCol(column);
            let previousValueRaw = previousVal ? previousVal.val : null;

            if (extraData[column.identifier]) {
                val = new Value(extraData[column.identifier]).get(previousVal);
            } else {
                val = column.val.get(previousVal);
            }

            log.info(`Generated value for column:[${column.identifier}] is: [${val}]. Previous value was: [${previousValueRaw}].`);
            
            dataRow.addData(column, val);
        });

        this.table.addDataRow(dataRow);
        return dataRow;
    }


    protected getPreviousDataRowCol(column: Column): DataRowCol {
        const previousDataRow = this.table.getLastDataRow();
        if(previousDataRow != undefined) {
            return previousDataRow.getDataCol(column);
        }
        return undefined;
    }
}

export default DataGenerator;
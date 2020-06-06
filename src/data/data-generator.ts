import Table from "../database/table";
import DataRow from "./DataRow";
import QueryCommand from "../query/query-command";
import Column, { NamedColumn } from "../database/column";
import { stringify } from "querystring";
import DataRowCol from "./data-row-col";

export class DataGenerator {

    constructor(protected table: Table, public queryCommand: QueryCommand) {

    }

    execute(extraData: object = {}): DataRow {

        const dataRow: DataRow = new DataRow(this.table, this.queryCommand);

        let column: Column;




        this.table.getColumns().forEach(column => {            
            let val: any;

            let previousVal : DataRowCol = this.getPreviousDataRowCol(dataRow, column);


            if (extraData[column.identifier]) {
                val = extraData[column.identifier];
            } else {
                val = column.val.get(previousVal);
            }
            dataRow.addData(column, val);
        });

        this.table.addDataRow(dataRow);
        return dataRow;
    }


    protected getPreviousDataRowCol(dataRow: DataRow, column: Column): DataRowCol {
        const previousDataRow = this.table.getLastDataRow();
        if(previousDataRow != undefined) {
            return previousDataRow.getDataCol(column);
        }
        return undefined;
    }
}

export default DataGenerator;
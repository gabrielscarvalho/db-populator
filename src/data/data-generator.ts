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

        const previousDataRow = this.table.getLastDataRow();


        this.table.getColumns().forEach(column => {            
            let val: any;

            let previousVal : any = previousDataRow ? previousDataRow.getData(column.identifier): undefined;


            if (extraData[column.identifier]) {
                val = extraData[column.identifier];
            } else {
                val = column.val.get(previousVal, previousDataRow);
            }
            dataRow.addData(column, val);
        });

        this.table.addDataRow(dataRow);
        return dataRow;
    }



}

export default DataGenerator;
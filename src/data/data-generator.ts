import Table from "../database/table";
import DataRow from "./DataRow";
import QueryCommand from "../query/query-command";
import Column, { NamedColumn } from "../database/column";
import { stringify } from "querystring";

export class DataGenerator {

    constructor(protected table: Table, public queryCommand: QueryCommand) {

    }

    execute(extraData: object = {}): DataRow {

        const dataRow: DataRow = new DataRow(this.table, this.queryCommand);

        let column: Column;
        this.table.getColumns().forEach(column => {            
            let val: any;

            if (extraData[column.identifier]) {
                val = extraData[column.identifier];
            } else {
                val = column.val.get();
            }
            dataRow.addData(column, val);
        });

        this.table.addDataRow(dataRow);
        return dataRow;
    }

}

export default DataGenerator;
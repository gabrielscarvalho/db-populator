import Table from "../database/table";
import DataRow from "./DataRow";
import QueryCommand from "../query/query-command";
import Column, { NamedColumn } from "../database/column";

export class DataGenerator {

    constructor(protected table: Table, protected queryCommand: QueryCommand){

    }

    execute(extraData: object = {}): DataRow {

        const dataRow : DataRow = new DataRow(this.table, this.queryCommand);

        let column: Column;
        this.table.getColumns().forEach(column => { 
            dataRow.addData(column.identifier, column.val.get());
        });

        this.table.addDataRow(dataRow);
        return dataRow;
    }

}

export default DataGenerator;
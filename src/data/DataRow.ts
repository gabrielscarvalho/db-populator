import Table from '../database/table';
import QueryCommand from '../query/query-command';
import Column from '../database/column';
import Parser from '../database/value/parser';
import DataRowCol from './data-row-col';
import { stringify } from 'querystring';




export class DataRow {

    public data: Map<string, any> = new Map<string, any>();
    public values: Map<string, DataRowCol> = new Map<string, DataRowCol>();


    constructor(public table: Table, public command: QueryCommand) {

    }


    addData(column: Column, val: any) {
        this.data[column.identifier] = val;

        const colValue: DataRowCol = new DataRowCol(this, column, val);

        this.values[column.identifier] = colValue;
    }


    set(columnIdentifier: string, val: any) {
        this.data[columnIdentifier] = val;
        const dataRowCol: DataRowCol = this.values[columnIdentifier];
        dataRowCol.setValue(val);
    }

    getDataCol(column: Column): DataRowCol {
        return this.values[column.identifier];
    }

    getData(columnIdentifier: string): any {
        return this.data[columnIdentifier] ? this.data[columnIdentifier] : undefined;
    }


    getQueryData() {
        let queryData: Map<string, string> = new Map<string, string>();

        let columnName: string;
        for (columnName in this.values) {
            let dataRowCol: DataRowCol = this.values[columnName];
            queryData[columnName] = dataRowCol.parsedVal;
        }
        return queryData;
    }

    clone() : DataRow{
        const dataRow: DataRow = new DataRow(this.table, this.command);
        dataRow.data = this.data;
        dataRow.values = this.values;
        return dataRow;
    }
}


export default DataRow;
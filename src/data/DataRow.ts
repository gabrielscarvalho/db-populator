import Table from '../database/table';
import QueryCommand from '../query/query-command';
import Column from '../database/column';
import Parser from '../database/value/parser';




export class DataRow {

    public data: Map<string, any> = new Map<string, any>();
    
    public queryData: Map<string, string> = new Map<string, string>();

    constructor(public table: Table, public command: QueryCommand) {
    
    }

    addData(column: Column, val: any) {
        this.queryData[column.name] = column.parser.parse(val);
        this.data[column.identifier] = val;
    }

    getData(columnIdentifier: string) : any {
        return this.data[columnIdentifier] ? this.data[columnIdentifier] : undefined;
    }
}


export default DataRow;
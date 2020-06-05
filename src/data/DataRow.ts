import Table from '../database/table';
import QueryCommand from '../query/query-command';




export class DataRow {

    public data: Map<string, any> = new Map<string, any>();

    constructor(protected table: Table, public command: QueryCommand) {

    }

    addData(columnIdentifier: string, val: any) {
        this.data[columnIdentifier] = val;
    }

    getData(columnIdentifier: string) : any {
        return this.data[columnIdentifier] ? this.data[columnIdentifier] : undefined;
    }
}


export default DataRow;
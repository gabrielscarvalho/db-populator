import Table from '../database/table';
import QueryCommand from './query-command';
import Column from '../database/column';

export class DataRow {
    
    constructor(protected table: Table, public command: QueryCommand, public data: object) {

    }


    getData(column: Column) : any {
        return this.data[column.identifier] ? this.data[column.identifier] : undefined;
    }
}


export default DataRow;
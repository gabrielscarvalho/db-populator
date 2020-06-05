import Table from '../database/table';
import QueryCommand from './query-command';

export class DataRow {
    
    constructor(protected table: Table, public command: QueryCommand, public data: object) {

    }

}


export default DataRow;
import Database from "./database";
import DataRow from './data/DataRow';
import Table from "./database/table";
import DataGenerator from "./data/data-generator";
import QueryCommand from "./query/query-command";




export class QueryBuilder {
    protected dataRows: DataRow[] = [];

    constructor(protected database: Database) {

    }


    insert(tableName: string, extraData: object = {}): DataRow {

        const table: Table = this.database.getTable(tableName);
        const dataRow : DataRow = new DataGenerator(table, QueryCommand.INSERT).execute(extraData);
        this.dataRows.push(dataRow);

        return dataRow;
    }


    print() : string {
        let dataRow: DataRow;
        this.dataRows.forEach(dataRow => {
            console.log('Data is:', JSON.stringify(dataRow.data));
        });
        return 'sqls';
    }
}


export default QueryBuilder;
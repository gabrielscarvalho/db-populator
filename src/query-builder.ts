import Database from "./database";
import DataRow from './data/DataRow';
import Table from "./database/table";
import DataGenerator from "./data/data-generator";
import QueryCommand from "./query/query-command";
import IQueryBuilder from "./query/interface-query-builder";
import GenericQueryBuilder from "./query/generic-query-builder";




export class QueryBuilder {
    protected dataRows: DataRow[] = [];
    protected queryBuilder: IQueryBuilder = new GenericQueryBuilder();

    constructor(protected database: Database) {

    }


    insert(tableName: string, extraData: object = {} ): DataRow {

        const table: Table = this.database.getTable(tableName);
        const dataRow : DataRow = new DataGenerator(table, QueryCommand.INSERT).execute(extraData);
        this.dataRows.push(dataRow);

        return dataRow;
    }


    print() : string {
        console.log('sqls: %o', this.queryBuilder.toSQL(this.dataRows));
        return 'sqls';
    }
}


export default QueryBuilder;
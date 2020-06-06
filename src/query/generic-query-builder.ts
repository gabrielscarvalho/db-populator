import DataRow from "../data/DataRow";
import QueryCommand from "./query-command";
import IQueryBuilder from "./interface-query-builder";
import { stringify } from "querystring";
import DataRowCol from "../data/data-row-col";



export class GenericQueryBuilder implements IQueryBuilder {
    protected sqls: string[] = [];

    resetQueries() {
        this.sqls = [];
    }

    public toSQL(dataRows: DataRow[]): string[] {
        this.resetQueries();

        let dataRow: DataRow;
        dataRows.forEach(dataRow => {

            if (dataRow.command == QueryCommand.INSERT) {

                this.sqls.push(this.insert(dataRow));

            } else if (dataRow.command == QueryCommand.DELETE) {
                this.sqls.push(this.delete(dataRow));
            } else {
                throw new Error(`not ready for command: [${dataRow.command}] `);
            }
        });
        return this.sqls;
    }


    protected insert(dataRow: DataRow): string {

        const queryData: Map<string, string> = dataRow.getQueryData();

        let columns: string[] = [];
        let values: string[] = [];

        let columnName: string;
        for (columnName in queryData) {
            columns.push(columnName);
            values.push(queryData[columnName]);
        }

        let SQL: string = `INSERT INTO ${dataRow.table.name} (${columns.join(',')}) VALUES (${values.join(',')});`;
        return SQL;
    }


    protected delete(dataRow: DataRow): string {

        const rowCols: Map<string, DataRowCol> = dataRow.values;

        let where: string[] = [];
        
        let columnName: string;
        for (columnName in rowCols) {
            const colRow: DataRowCol = rowCols[columnName];

            if(colRow.column.isPrimary) {
                where.push(`${colRow.column.name}=${colRow.parsedVal}`);
            }
        }

        if(where.length == 0) {
            throw new Error(`Table: [${dataRow.table.name}] does not have any primary key`);
        }

        let SQL: string = `DELETE FROM ${dataRow.table.name} WHERE ${where.join(' AND ')};`;
        return SQL;
    }

}

export default GenericQueryBuilder;
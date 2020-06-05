import DataRow from "../data/DataRow";
import QueryCommand from "./query-command";
import IQueryBuilder from "./interface-query-builder";



export class GenericQueryBuilder implements IQueryBuilder {
    protected sqls: string[] = [];

    resetQueries() {
        this.sqls = [];
    }

    public toSQL(dataRows: DataRow[]) : string[] {
        this.resetQueries();

        let dataRow: DataRow;
        dataRows.forEach(dataRow => {

            if (dataRow.command == QueryCommand.INSERT) {
                this.sqls.push(this.insert(dataRow));
            } else {
                throw new Error(`not ready for command: [${dataRow.command}] `);
            }
        });
        return this.sqls;
    }


    protected insert(dataRow: DataRow): string {

        let SQL: string = `INSERT INTO ${dataRow.table.name}   ${JSON.stringify(dataRow.data)}`;

        return SQL;
    }

}

export default GenericQueryBuilder;
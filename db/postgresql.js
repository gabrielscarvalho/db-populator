
class PostgreSQL {

    constructor(dbStructure) {
        this.structure = dbStructure;
        this.sqls = [];
    }


    insert(tableName, dataRow) {
        let sql = 'INSERT INTO ' + tableName;

        let columnNames = [];
        let values = [];

        for(const columnName in dataRow) {
            const column = dataRow[columnName];
            columnNames.push(columnName);
            values.push(column.val);
        }


        sql  = sql + "(" + columnNames.join(',') + ") ";

        sql  = sql + " VALUES (" + values.join(',') + ");";

        console.log(sql);
        this.sqls.push(sql);
    }

}


module.exports = PostgreSQL;
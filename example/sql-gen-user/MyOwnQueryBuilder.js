
/**
 * Change it to fit your needs :)
*/
class MyOwnQueryBuilder {

    constructor(dbStructure, valueStrategyParser) {
        this.structure = dbStructure;
        this.valueStrategyParser = valueStrategyParser;
        this.sqls = [];
    }


    insert(tableName, dataRow) {
        let sql = 'IMPROBABLE INSERT INTO ' + tableName;

        let columnNames = [];
        let values = [];

        for(const columnName in dataRow) {

            const column = dataRow[columnName];
            columnNames.push(columnName);
            //this method parse the value with the specified type
            const parsedValue = this.valueStrategyParser.apply(column.type,column.val);
            values.push(parsedValue);
        }

        sql  = sql + " SET THE VALUES (" + values.join(',') + ")";

        sql  = sql + " FOR THE COLUMNS (" + columnNames.join(',') + ");";

        this.sqls.push(sql);
        return sql;
    }

}


module.exports = MyOwnQueryBuilder;
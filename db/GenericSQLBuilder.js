const ValueStrategyParser = require('./../lib/value-strategy-parser');


class GenericSQLBuilder {

    constructor(dbStructure, valueStrategyParser) {
        this.structure = dbStructure;
        this.valueStrategyParser = valueStrategyParser;
        this.sqls = [];
    }


    insert(tableName, dataRow) {
        let sql = 'INSERT INTO ' + tableName;

        let columnNames = [];
        let values = [];

        for(const columnName in dataRow) {
            const column = dataRow[columnName];
            columnNames.push(columnName);
           
            const parsedValue = this.valueStrategyParser.apply(column.type,column.val);
            values.push(parsedValue);
        }

        sql  = sql + "(" + columnNames.join(',') + ")";
        sql  = sql + " VALUES (" + values.join(',') + ");";

        this.sqls.push(sql);
        return sql;
    }

}


module.exports = GenericSQLBuilder;
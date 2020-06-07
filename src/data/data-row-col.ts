import Column from "../database/column";
import DataRow from "./DataRow";



/**
 * Carries the column value
 * 
*/
class DataRowCol {
    public parsedVal: string;
    public hasData: boolean;
    constructor(public dataRow: DataRow,
        public column: Column,
        public val: any,
    ) {
        this.parsedVal = column.parser.parse(val);
        this.hasData = true;
    }


    setValue(val: any){
        this.parsedVal = this.column.parser.parse(val);
    }


    static emptyDataRolCol(dataRow: DataRow, column: Column) : DataRowCol {
        const dataRowCol: DataRowCol = new DataRowCol(dataRow, column, undefined);
        dataRowCol.hasData = false;
        return dataRowCol;
    }
}

export default DataRowCol;
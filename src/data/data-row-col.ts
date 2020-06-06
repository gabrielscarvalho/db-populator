import Column from "../database/column";
import DataRow from "./DataRow";



/**
 * Carries the column value
 * 
*/
class DataRowCol {
    public parsedVal: string;

    constructor(public dataRow: DataRow,
        public column: Column,
        public val: any,
    ) {
        this.parsedVal = column.parser.parse(val);
    }

}

export default DataRowCol;
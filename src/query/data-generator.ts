import Table from "../database/table";
import DataRow from "./DataRow";
import QueryCommand from "./query-command";

export class DataGenerator {

    constructor(protected table: Table, protected queryCommand: QueryCommand){

    }


    execute(extraData: object = {}): DataRow {
        const data : DataRow = null;

        

        this.table.addDataRow(data);
        return data;
    }

}

export default DataGenerator;
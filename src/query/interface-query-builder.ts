import DataRow from "../data/DataRow";



export interface IQueryBuilder {
    toSQL(dataRows: DataRow[]) : string[];
}

export default IQueryBuilder;
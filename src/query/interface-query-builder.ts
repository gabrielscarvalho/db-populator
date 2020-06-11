import DataRow from "../data/data-row";



export interface IQueryBuilder {
    toSQL(dataRows: DataRow[]) : string[];
}

export default IQueryBuilder;
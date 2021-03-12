import { iDatabase, iDataRow, iQueryBuilder, iTable } from '../../interfaces';
import QueryCommand from './query-command.enum';


export class QueryBuilder implements iQueryBuilder {

  protected dataRows: iDataRow[] = [];

  constructor(private database: iDatabase) {

  }

  public insert(tableName: string, extraData: object = {} ): iDataRow {
    const table: iTable = this.database.getTable(tableName);
    const dataRow: iDataRow = new DataGenerator(table, QueryCommand.INSERT).execute(extraData);
    this.dataRows.push(dataRow);

    return dataRow;
  }

}
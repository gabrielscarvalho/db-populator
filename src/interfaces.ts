import QueryCommand from './core/query-builder/query-command.enum';
import { Optional } from './core/utils/optional';

export interface iMap<T> {
  has: (name: string) => boolean ;
  add: (name: string, content: T, config: { throwIfExists: boolean }) => iMap<T>;
  get: (name: string, config: { throwIfNotExists: boolean }) => Optional<T>;
  delete: (name: string, config: { throwIfNotExists: boolean }) => boolean;
  find: (filter: any) => Optional<T>;
  getKeys: () => string[];
  getValues: () =>T[];  
}

export interface iParser {
  type: string;
  parse(val: any): string;
}

export type iValueGenerator = () => any;

export interface iDataRowColumn {
  dataRow: iDataRow;
  column: iColumn;
  rawValue: any;
  parsedValue: string;

  /**
   * Creates a value generator that will return the raw value.
   * Useful for example, for geting the last generated id.
  */
  getRawValueAsValueGen: iValueGenerator; 

  /**
   * Set the value and prepared the parsed value.
   */
  setValue: (rawValue: any) => void;
}

export interface iDataRow {
  data: iMap<iDataRowColumn>;
  queryCommand: QueryCommand;
  table: iTable;

  new: (queryCommand: QueryCommand, table: iTable, extraData: object) => iDataRow;
  getColumnData:(columnName: string) => iDataRowColumn;

  getRawValue: (columnName: string) => any;

  setRawValue: (columnName: string, newValue: any) => void;


  getColumnsName: () => string[];
  getColumnsParsedValue: () => string[];

  print: () => void;
}

export interface iColumn {
  table: iTable;
  key: string;
  name: string;
  parser: iParser;
  valueGen: iValueGenerator;
}

export interface iTable {
  name: string;
  database: iDatabase;
  data: iDataRow[];
  columns: iMap<iColumn>;

  /**
   * Return the last DataRow generated - if present.
  */
  getLastDataRow: () => Optional<iDataRow>;


  getColumn: (columnKey: string) => iColumn;

  /**
   * Adds a new column to the table.
   * @param columnKey the unique name or nickname.
   * @param type the type of the column. 'string', 'number', or created parsers.
   * @param valueGen the function that will generate the value.
   * @param columnName the real name of the column in case of nicknames at columnKey
  */
  addColumn: (columnKey: string, type: string | iParser, valueGen: iValueGenerator, columnName?: string) => iTable;

  /**
   * Creates a new data object.
   * @param extraData object that contains the column key and value to be replaced.
   */
  createNewDataRowAndStore: (queryCommand: QueryCommand, extraData: object) => iDataRow;

  /**
   * Function that can be called after the data is generate.
   * It is a place to fix info before releasing the DataRow
   * 
  */
  afterGenerateData: (fn: (dataRow: iDataRow) => iDataRow) => iTable;
}

export interface iDatabase {
  parsers: iMap<iParser>;
  tables: iMap<iTable>;

  addParser: (parser: iParser) => iDatabase;
  getParser: (parserName: string) => iParser;

  addTable: (tableName: string) => iTable;
  getTable: (tableName: string) => iTable;


  insert: (tableName: string, extraData: object) => iDataRow;

  /**
   * Return the last DataRow generated - if present.
  */
  getLastDataRow: (tableName: string) => Optional<iDataRow>;


  addDataRow: (dataRow: iDataRow) => iDatabase;

  toSQL: () => string[];
}


export interface iQueryBuilder {
  insert: (tableName: string, extraData: object) => iQueryBuilder;
}
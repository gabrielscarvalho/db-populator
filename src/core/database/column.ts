import { iColumn, iParser, iTable, iValueGenerator } from '../../interfaces';

export class Column implements iColumn {
  public table: iTable;
  public key: string;
  public name: string;
  public parser: iParser;
  public valueGen: iValueGenerator;


  public constructor(table: iTable, key: string, name: string, parser: iParser, valueGen: iValueGenerator) {
    this.table = table;
    this.key = key;
    this.name = name;
    this.parser = parser;
    this.valueGen = valueGen;
  }
  
}
import { iParser } from '../../interfaces';


export abstract class Parser {
  
  public addQuotes(value: string): string {
    return `"${value}"`;
  }
  
  public getNullString(): string {
    return 'null';
  }
}
import { iParser } from '../../interfaces';
import { NumberParser } from './number.parser';
import { Parser } from './parser';

export class DateParser extends Parser implements iParser {

  public type: string = 'date';
  
  public parse(val: Date): string {
    const date = val.toJSON();
    return this.addQuotes(date);
  }
}
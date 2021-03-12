import { iParser } from '../../interfaces';
import { Parser } from './parser';


export class RawParser extends Parser implements iParser {

  public type: string = 'raw';

  public parse(val: any): string {
    return String(val);
  }
}
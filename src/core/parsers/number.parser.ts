import { iParser } from '../../interfaces';
import { Parser } from './parser';


export class NumberParser extends Parser implements iParser {

  public type: string = 'number';
  public precision: number = 2;

  public parse(val: number): string {
    let preparedValue: string = null;
  
    if (this.precision === 0) {
      preparedValue = String(parseInt(String(val)));
    } else {
      preparedValue = parseFloat(String(val)).toFixed(this.precision);
    }

    return (!!val) ? preparedValue : this.getNullString();
  }

  public static withPrecision(precision: number) {
    const parser = new NumberParser();
    parser.precision = precision;
    return parser;
  }
}
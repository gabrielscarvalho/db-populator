import { iParser } from '../../interfaces';
import { NumberParser } from './number.parser';

export class IntParser extends NumberParser implements iParser {

  public type: string = 'int';
  public precision: number = 0;
}
import { iValueGenerator } from '../../interfaces';


/**
 * Returns the value of have defined.
*/
export const Fixed = (val: any): iValueGenerator => {
  return () => {
    return val;
  }
}
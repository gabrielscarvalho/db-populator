


import { Chance } from 'chance';
import _ from 'lodash';
import { iValueGenerator } from '../../interfaces';
const chance = new Chance();

interface DateRange {
  year: {
    min: number;
    max: number;
  };
  month: {
    min: number;
    max: number;
  };
  day: {
    min: number;
    max: number;
  };
  hour: {
    min: number;
    max: number;
  };
  minute: {
    min: number;
    max: number;
  };
  second: {
    min: number;
    max: number;
  };
}



export class DateGen {


  public static getDefaultDateRange(): DateRange {
    return {
      year: {
        min: 1970,
        max: 2050
      },
      month: {
        min: 0,
        max: 11
      },
      day: {
        min: 1,
        max: 30
      },
      hour: {
        min: 0,
        max: 12
      },
      minute: {
        min: 0,
        max: 60
      },
      second: {
        min: 0,
        max: 60
      }
    }
  }


  public static between(range: Partial<DateRange> = {}): iValueGenerator {
    
    const dateRange = Object.assign(_.cloneDeep(DateGen.getDefaultDateRange()), range);

    const year = chance.integer(dateRange.year);
    const month = chance.integer(dateRange.month);
    const day = chance.integer(dateRange.day);
    const hour = chance.integer(dateRange.hour);
    const minute = chance.integer(dateRange.minute);
    const second = chance.integer(dateRange.second);

    return () => {
      return new Date(year, month, day, hour, minute, second);
    }
  }


    /**
     * Returns a random date
     * @see docs https://chancejs.com/text/date.html
    */
    public static Random(): iValueGenerator {
      return () => {
        return chance.date();
      }
    }

  

}
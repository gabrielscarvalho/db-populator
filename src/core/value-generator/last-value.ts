import { iColumn, iDataRow, iDataRowColumn, iValueGenerator } from '../../interfaces';
import { Optional } from '../utils/optional';


interface LastValueConfig {
  throwErrorIfNotExists: boolean;
}

export const LastValue = (column: iColumn, defaultValue: any = null, config: LastValueConfig = { throwErrorIfNotExists : false }) : iValueGenerator => {

  return () => {

    const optLastDataRow: Optional<iDataRow> = column.table.getLastDataRow();

    if (optLastDataRow.isPresent()) {
      const lastDataRow: iDataRow = optLastDataRow.get();
      return lastDataRow.getRawValue(column.key);
    }

    if (config.throwErrorIfNotExists) {
      throw new Error(`There was no last value for column: [${column.table.name}.${column.key}]. Assure to create a register to this table before or change the flag throwErrorIfNotExists to false.`);
    }

    return defaultValue;
  }

}
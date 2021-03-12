

export class TableNotFoundException extends Error {
 
  constructor(table: string) {
    super(`The table [${table}] was not found. Check if you typed it right.`);
    Object.setPrototypeOf(this, TableNotFoundException.prototype);
  }
}
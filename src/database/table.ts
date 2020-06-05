
import Column  from './column';
import ReferenceColumn from './column/ReferenceColumn';
import SimpleColumn from './column/SimpleColumn';

export class Table {
    protected columns: [string, Column];

    constructor(public name: string) {

    }

    protected prepareValue(val: any): Function {
        return () => {

        }
    }


    addColumnReference(name: string, reference: Column): Table {
        let col: Column = new ReferenceColumn(this, name, reference)
        this.columns.push(col);
        return this;
    }

    addColumn(name: string, type: string, val: any, isID: boolean = false): Table {
        let col: Column = new SimpleColumn(this, name, type, this.prepareValue(val), isID);
        this.columns.push(name, col);
        return this;
    }

    getColumn(name: string): Column {
        return this.columns[name];
    }

    protected getName(): string {
        return this.name;
    }
}

export default Table;
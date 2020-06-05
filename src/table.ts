

interface Column {
    table: Table;
    name: string;
    type: string;
    val: Value;
}


interface ValueGenerator {

    getNext(param: string) : any;
    getPrevious(param: string) : any;
}


interface Parser {
    type: 'string';
    parse(val: any) : string;
}


class Id implements ValueGenerator {

    getNext(param: string) : any {

    }

    getPrevious(param: string) : any {
        
    }
}




class SingleColumn implements Column {
    val: Value;

    constructor(public table: Table, public name: string, public type: string, val: Function, public id: boolean) {
        this.val = new Value(table, this, val);
    }
}


class ReferenceColumn implements Column {
    type: string;
    val: Value;

    constructor(public table: Table, public name: string, protected reference: Column) {
        this.type = reference.type;
        this.val = reference.val;
    }
}


class Value {
    result: any[]
    constructor(protected table: Table, protected column: Column, protected fn: Function) {

    }
}




class Table {
    protected columns: [string, Column];

    constructor(public name: string) {

    }

    protected prepareValue(val: any): Function {
        return () => {

        }
    }


    addColumnReference(name: string, reference: Column) : Table {
        let col: Column = new ReferenceColumn(this, name, reference)
        this.columns.push(col);
        return this;
    }

    addColumn(name: string, type: string, val: any, isID: boolean = false): Table {
        let col: Column = new SingleColumn(this, name, type, this.prepareValue(val), isID);
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


class Database {
    protected tables: Table[];
    protected parsers: [string, Parser];

    addTable(table:Table) : Database {
        this.tables.push(table);
        return this;
    }

    addParser(type: string, parser: Parser): Database {
        this.parsers = [type, parser];
        return this;
    }
}



const order: Table = new Table('t_order');
order.addColumn('order_id', 'string', 'value')
    .addColumn('total_value', 'string', '200');

const consignment: Table = new Table('t_order');
order.addColumnReference('order_id', order.getColumn('order_id'));



const db = new Database();
db
    .addTable(order)
    .addTable(consignment);



module.exports = Table;
var Id = /** @class */ (function () {
    function Id() {
    }
    Id.prototype.getNext = function (param) {
    };
    Id.prototype.getPrevious = function (param) {
    };
    return Id;
}());
var SingleColumn = /** @class */ (function () {
    function SingleColumn(table, name, type, val, id) {
        this.table = table;
        this.name = name;
        this.type = type;
        this.id = id;
        this.val = new Value(table, this, val);
    }
    return SingleColumn;
}());
var ReferenceColumn = /** @class */ (function () {
    function ReferenceColumn(table, name, reference) {
        this.table = table;
        this.name = name;
        this.reference = reference;
        this.type = reference.type;
        this.val = reference.val;
    }
    return ReferenceColumn;
}());
var Value = /** @class */ (function () {
    function Value(table, column, fn) {
        this.table = table;
        this.column = column;
        this.fn = fn;
    }
    return Value;
}());
var Table = /** @class */ (function () {
    function Table(name) {
        this.name = name;
    }
    Table.prototype.prepareValue = function (val) {
        return function () {
        };
    };
    Table.prototype.addColumnReference = function (name, reference) {
        var col = new ReferenceColumn(this, name, reference);
        this.columns.push(col);
        return this;
    };
    Table.prototype.addColumn = function (name, type, val, isID) {
        if (isID === void 0) { isID = false; }
        var col = new SingleColumn(this, name, type, this.prepareValue(val), isID);
        this.columns.push(name, col);
        return this;
    };
    Table.prototype.getColumn = function (name) {
        return this.columns[name];
    };
    Table.prototype.getName = function () {
        return this.name;
    };
    return Table;
}());
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.addTable = function (table) {
        this.tables.push(table);
        return this;
    };
    Database.prototype.addParser = function (type, parser) {
        this.parsers = [type, parser];
        return this;
    };
    return Database;
}());
var order = new Table('t_order');
order.addColumn('order_id', 'string', 'value')
    .addColumn('total_value', 'string', '200');
var consignment = new Table('t_order');
order.addColumnReference('order_id', order.getColumn('order_id'));
var db = new Database();
db
    .addTable(order)
    .addTable(consignment);
module.exports = Table;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
var ReferenceColumn_1 = require("./column/ReferenceColumn");
var SimpleColumn_1 = require("./column/SimpleColumn");
var Table = /** @class */ (function () {
    function Table(name) {
        this.name = name;
    }
    Table.prototype.prepareValue = function (val) {
        return function () {
        };
    };
    Table.prototype.addColumnReference = function (name, reference) {
        var col = new ReferenceColumn_1.default(this, name, reference);
        this.columns.push(col);
        return this;
    };
    Table.prototype.addColumn = function (name, type, val, isID) {
        if (isID === void 0) { isID = false; }
        var col = new SimpleColumn_1.default(this, name, type, this.prepareValue(val), isID);
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
exports.Table = Table;
exports.default = Table;

import Table from './table';
import Value from './value';
export interface Column {
    table: Table;
    identifier: string;
    name: string;
    type: string;
    val: Value;
}

export default Column;
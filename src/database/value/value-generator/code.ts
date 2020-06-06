import DataRowCol from "../../../data/data-row-col";
import Random from './random';
export class Code {
    
    getNext(prefix: string = ''): Function {
        return  Random.string(prefix, 5);
    }
}

export default Code;
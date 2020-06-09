import { getPreviousValue } from "./previous";

export class Id {
    

    constructor(protected ids: object = {}) {

    }

    getNext(idUniqueKey: string): Function {

        if (!this.ids[idUniqueKey]) {
            this.ids[idUniqueKey] = 0;
        }

        return getPreviousValue(this.ids[idUniqueKey], (val: number) => {
            return val + 1;
        });

    }
}

export default Id;

export class Id{
    protected ids: Map<string, number> = new Map<string, number>();

    constructor() {

    }

    getNext(idUniqueKey: string): Function {

        if (!this.ids[idUniqueKey]) {
            this.ids[idUniqueKey] = 0;
        }

        let self: Id = this;
        return () => {
            self.ids[idUniqueKey] = self.ids[idUniqueKey] + 1;
            return self.ids[idUniqueKey];
        }
    }
}

export default Id;
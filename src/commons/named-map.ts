


class NamedMap<T> {
    protected data: Map<string, T> = new Map<string, T>();

    constructor(public allowReplace: boolean = true) {
    }

    put(key: string, val: T) {
        if (this.has(key) && !this.allowReplace) {
            throw new Error(`Key: [${key}] was already taken`);
        }
        this.data.set(key, val);
    }

    has(key: string) {
        return (this.data.get(key) != undefined);
    }


    get(key: string, throwErrorIfNotFound: boolean = true) {
        if (this.has(key)) {
            return this.data.get(key);
        }
        if (throwErrorIfNotFound) {
            throw new Error(`could not find the data: [${key}]`);
        }
        return null;
    }

    values(): T[] {

        let values: T[] = [];

        this.data.forEach((val) => {
            values.push(val);
        });

        return values;
    }

    names(): string[] {
        let names: string[] = [];

        this.data.forEach((val, name) => {
            names.push(name);
        });

        return names;
    }


    getAllProp(prop: string): any[] {
        let propData: any[] = [];

        this.data.forEach((val) => {
            propData.push(val[prop]);
        });

        return propData;
    }


    searchByProp(prop: string, searchValue: any): T {
        let value: T;
        for (value of this.values()) {
            if (value[prop] == searchValue) {
                return value;
            }
        }
        return null;
    }
}


export default NamedMap;
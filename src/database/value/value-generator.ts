



export interface ValueGenerator {

    getNext(param: string): any;
    getPrevious(param: string): any;
}

export default ValueGenerator;

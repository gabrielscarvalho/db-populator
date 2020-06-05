


export interface Parser {
    type: string;
    parse(val: any): string;
}

export default Parser;
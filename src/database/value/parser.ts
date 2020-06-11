import _ from 'lodash';


export interface Parser {
    type: string;
    parse(val: any): string;
}

export default Parser;


export const isParser = (instance: object): boolean => {
    return (_.isString(instance['type']) && _.isFunction(instance['parse']));
}
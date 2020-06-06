
export class Random {

    number(): Function {
        return () => (2.432);
    }

    name(): Function{
        return () => ('John');
    }
}


export default new Random();
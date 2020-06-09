import DataRowCol from "../../../data/data-row-col";




export const getPreviousValue = (initialValue : any, fn : Function) : Function  => {


    return (previousVal: DataRowCol) => {

        if(previousVal == undefined || previousVal == null) {
            return fn(initialValue);
        }

        return fn(previousVal.val);
    }
};



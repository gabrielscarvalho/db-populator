

const VALUE_ADAPTER = {
    'string' : (val) => {

        return '"' + val + '"';
    },
    'int' : (val) => {

        return  parseInt(val);
    }
};


module.exports = VALUE_ADAPTER;
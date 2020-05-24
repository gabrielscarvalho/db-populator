




const configure = (dbAdaptor) => {
    this.dbAdaptor = dbAdaptor;
    return (table, extraData) => {
        console.log('this method will deal with the inserts');
        return {};
    };
}




module.exports = configure;
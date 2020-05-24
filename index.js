const configure = require('./lib/insert');
const id = require('./lib/id');
const PostgreSQL = require('./db/postgresql');



const initialIds = {
    't_order': 100
};

const ID = new id(initialIds);



const dbStructure = {
    't_order': {
        'id' : ID.getNext('t_order')
    }
}



const insert = configure(new PostgreSQL(dbStructure));

insert('t_order', 'blablabal')
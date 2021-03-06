# DB Populator
![Travis Status](https://img.shields.io/travis/gabrielscarvalho/db-populator) ![Type](https://img.shields.io/badge/type-CLI-yellow.svg?style=flat-square) ![NPM License](https://img.shields.io/npm/l/db-populator) ![GitHub issues](https://img.shields.io/github/issues/gabrielscarvalho/db-populator) [![GitHub stars](https://img.shields.io/github/stars/gabrielscarvalho/db-populator.svg?style=social&label=Stars)](https://github.com/gabrielscarvalho/db-populator)

Make it easy to populate your test database, creating inserts based on a simple json.
It will deal with IDs and random column filling, letting you free to focus in what makes your scenario unique.

![Db populator full scenario generating](https://raw.githubusercontent.com/gabrielscarvalho/db-populator/master/img/code_example.png)

## Basic Example

Check out the folder: [example](https://github.com/gabrielscarvalho/db-populator/tree/master/example "example")
Inside of it, you will find 3 files:
* db-structure: defines the db rules
* insert-configure	: configure the insert 
* index.js: run your command.
```javascript
const  Insertable  =  require('db-populator/lib/insertable');
const  Random  =  require('db-populator/lib/random');

// a fn that receives a instance of (db-populator/lib/id) as param
const  dbStructure  =  (id)  => ({
	't_customer': {
		'id': { 'type':  'int', val:  id.getNext('t_customer') },
		'name': { type:  'string', val:  Random.fromList(['John', 'Paul', 'Suzan', 'Mark']) },
	},
	't_address': {
		'id': { 'type':  'int', val:  id.getNext('t_address') },
		'customer_id': { 'type':  'int', val:  id.getCurrent('t_customer') }, // get last id created, for you not have to fill it.
		'country': { type:  'string', val:  Random.fromList(['Brazil', 'United States', 'Canada']) }, //check out all the options for this random class at the end of documentation
	}
});

const  initialIds  = {
	't_customer':  26,
	't_address':  105
};
const  insert  =  new  Insertable(dbStructure, initialIds);

insert.add('t_customer', { name:  'Gabriel'});
insert.add('t_address', {});
const  customer  =  insert.add('t_customer', {});
insert.add('t_address', { country:  customer.name});

insert.printSQLs();
//INSERT INTO t_customer(id,name) VALUES (27,'Gabriel');
//INSERT INTO t_address(id,customer_id,country) VALUES (106,27,'Brazil');
//INSERT INTO t_customer(id,name) VALUES (28,'John');
//INSERT INTO t_address(id,customer_id,country) VALUES (107,28,'John');
```


And that's all! It will return your inserts.
## About the json

It must contain the structure:
```javascript
    {
    <table_name> : {
       <column_name or easier identifier> :  { type: <type_of_column>, val: <raw_or_fn()>, column: <optional String>  }
    }
```
Example:
```javascript
    {
     't_customer' : {
         'id': { 'type':  'int', val:  id.getNext('t_customer'), column: 'customer_id' },
         'name' : { type: 'string', val: 'John', column: 'customer_name' },
         'birth_date': { type: 'date', val: Random.date({ minYear:  1970, maxYear:  2010 })} 
      }
    }
```
In this example, if we execute:
```javascript
    insert.add('t_customer', {name: 'Mary'}); //  {customer_id: 1, customer_name: 'Mary', birth_date: 1996-03-11}
    insert.add('t_customer', {}); //  {customer_id: 2, customer_name: 'John', birth_date: 1997-01-06}
    insert.add('t_customer', {id: 5}); //  {customer_id: 5, customer_name: 'John', birth_date: 1990-10-01} 
```
**Notice that**:

 - if you do not inform the field value on insert method,  it will take from the json.
 - *id.getNext('t_customer')* helps you to get the next id easily, but you still can force the next value.
	 - *id.getCurrent('t_customer')* will return the last customer created id
 - the field "val" must be the literal value or a function that will return it.
	 - Check out the documentation of it down below.


## Types

Types are pre-defined in order to populate the values into the insert. 
You can see them at: [default-value-strategy.js](https://github.com/gabrielscarvalho/db-populator/blob/master/lib/default-value-strategy.js)
At this moment, you can use:


|type| effect on queries| 
| ------------ | ------------ |
|string| it will put quotes at the variable|
|int| parse to int |
|float| parse to float|
| datetime| parse a data as string 'YYYY-MM-DD HH:mm:ss'|
| date | parse a data as string 'YYYY-MM-DD'|
| bool| parse to boolean |
|raw| will just add the value the same way it is. You can use this for functions, for example, NOW()|

You are able to add or replace types if required.

```javascript
const dbStructure = (id) =>{
   't_customer' => {
       'fieldX' : { type: 'my-special-type', val: Random.date({}), column: 'special_type' }
    }
}
const  insert  =  new  Insertable(dbStructure, initialIds);

insert.addParser('my-special-type', (val)  => {
	//remember to add quotes if is string 
    return insert.addQuotes('year-month: ' + val.getFullYear() + '-' + (val.getMonth()+1)); 
});

//notice that the field value contains only the value.
const customer = insert.add('t_customer', {});
console.log(customer.fieldX); // Date object (2010-11-29 12:01:34)

insert.printSQLs();
//INSERT into t_customer (special_type) VALUES ('year-month: 2010-11');

```
## Values
*Val* is the prop for the value of the column.
You can use it with a simple function or a literal value:
```javascript
't_customer' : {
    'columnA': {type: 'string', val: () => return 'fn response: ' + Math.random()},
    'columnB': {type: 'string', val:  'const literal response'},
}
// { columnA: 'fn response 0.849320192', columnB: 'const literal response'}
```
This concept is used by ID & Random (documentation down below)

## Column
*column* is the optional property that will name the informed column into the query.
It is **only used for query**. The object returned by *insert.add(tableName, extraData)* will have the same props as you have mapped in *db-structure*. 
```javascript
//db-structure:
't_customer' : {
    'columnA': {type: 'string', val: 'fixed value', column: 'a_huge_column_name'},
    'columnB': {type: 'string', val:  'b value'}, // without column name, this field will be named: columnB on the insert
    'real_column_name': {type: 'string', val:  'real_column'}, //if you use the identifier as the real name of the column, you dont need to add the column prop.
}

const obj =insert.add('t_customer', {columnA : 'new value'})
console.log(obj); // {columnA: 'new value', columnB: 'b value', real_column_name: 'real_column'}
insert.printSQLs();
//INSERT Into t_customer (a_huge_column_name, columnB, real_column_name) VALUES ('new value', 'b value', 'real_column');
// { columnA: 'fn response 0.849320192', columnB: 'const literal response'}
```


# Class Docs

## Insertable
Insertable is the main class of this project. It will create the inserts.

### insert.add(string tableName, object extraData)
Creates a new sql insert and save it.
Keep in mind this table:
```javascript
    {
     't_customer' : {
         'id': { 'type':  'int', val:  id.getNext('t_customer'), column: 'customer_id' },
         'name' : { type: 'string', val: 'John', columnName: 'customer_name' }
      }
    }
```
If you call insert, it will return your filled object.
```javascript
    const customer = insert.add('t_customer', { name: 'Mary' })
    console.log('just created: ', customer.name)
```    
You can use it to make cascade inserts:

```javascript
    const customer = insert.add('t_customer', { name: 'Mary' })
    insert.add('t_address', { customer_id: customer.id})
```
**Note**: the object returned will have the same props as your json is mapped.
 That is the reason you can use *customer.id* on the second insert, instead of *customer.customer_id* (that is the real column name)

### insert.printSQLs()
Print all SQLs saved until that moment.

### insert.objects
Return all objects that you have created.

### insert.completeObjects
Return all objects that will be used to create your inserts. 
It contains the structure used to created the *insert.objects*;

### insert.setNextIdStrategy(fn)
Set the strategy to choose the next id:

```javascript
insert.setNextIdStrategy((tableName, previousId)  => {
	if(tableName == 't_customer') {
         return (previousId+10);
    }
	return  --previousId;
});

```
### insert.setQueryBuilder(clazz)
If the SQL structure:

> INSERT INTO tableName  (columnA, columnB)  VALUES (valueA, 'valueB') 

does not work for you,  you can create your own QueryBuilder.
Just create your own based on: [https://github.com/gabrielscarvalho/db-populator/blob/master/db/GenericSQLBuilder.js](https://github.com/gabrielscarvalho/db-populator/blob/master/db/GenericSQLBuilder.js)

A sample: 

```javascript
class YourOwnQueryBuilder {

    constructor(dbStructure, valueStrategyParser = new ValueStrategyParser('"')) {
        this.structure = dbStructure;
        this.valueStrategyParser = valueStrategyParser;
        this.sqls = [];
    }

    // You just need to recreate this method:
    insert(tableName, dataRow) {
        let sql = 'INSERT INTO ' + tableName;

        let columnNames = [];
        let values = [];

        for(const columnName in dataRow) {
            const column = dataRow[columnName];
            columnNames.push(columnName);
	        //valueStrategyParser will apply what your field type requires.
            const parsedValue = this.valueStrategyParser.apply(column.type,column.val);
            values.push(parsedValue);
        }
		//a simple concat of the SQL. change it as you wish;
        sql  = sql + "(" + columnNames.join(',') + ")";
        sql  = sql + " VALUES (" + values.join(',') + ");";

        this.sqls.push(sql);
    }

}
```
After that, just inform Insertable about it:
```javascript
insert.setQueryBuilder(YourOwnQueryBuilder); //its the class and not the object!!!
insert.add('t_customer', {});
```


Obviously, use it to switch between single quote ' or double quote: ".

### insert.addRawInsert(sql)
Adds a insert mannualy.

### insert.addComment(comment)
Adds a comment to split the sqls.


### insert.useStringQuoteSeparator(quoteCharSeparator)
Sets the char that will wrap every string on the query
```javascript
insert.useStringQuoteSeparator('A_COMPLETELY_INVALID_ONE');
insert.add('t_customer', {});
// insert into ... VALUES(A_COMPLETELY_INVALID_ONEjohnA_COMPLETELY_INVALID_ONE, other values..)
// a valid one: insert.useStringQuoteSeparator('"');
```

### insert.addQuotes(string)
When creating custom parsers, it will help you to standardize the quote used.
Check the *insert.addParser()* method for the example;
Its just a shortcut to add the quotes to a simple string.

### insert.addParser(type, fn)
Allows you to add new parsers.
```javascript
insert.useStringQuoteSeparator('"');
insert.addParser('my-special-type', (val)  => {
	insert.addQuotes('my special treatment!!!  '+  val)
});
//db-structure.js:
't_customer' : {
    'field_x': {type: 'my-speacial-type', val: 'hi'}
}
insert.add('t_customer', {});
// insert into t_customer (field_x) values ("my special treatment!!! hi");
```

### insert.setNullValue(nullString)
Defines the string that will be used when a value is null
```javascript
//db-structure.js:
't_customer' : {
    'name': {type: 'string', val: null},
    'surname': {type: 'string', val: 'Doe'}
}
insert.setNullValue('null');
insert.add('t_customer', {});
// insert into t_customer (name, surname) values (null, 'Doe');
```
## Random
Random helps you to create random information.
It will return a function that when it is executed, will return a random value.

Random is now using [ChanceJS](https://chancejs.com/index.html) to return its values. 
All Random methods that are supporting ChanceJS, they have the URL of the documentation in their comments.

Currently, the random methods are:

* string
* fromList
* number
* date
* dateWithSpecific
* word
* email
* guid
* hash
* char
* cpf
* name
* lastName
* url

**Check the examples**:
```javascript
const Random = require('db-populator/lib/random');
const result = Random.fromList(['A','B','C','D'])
console.log(typeof result); //function
console.log(result()); // B

//A more complex example, with multiple lists and fixed values at the middle
const result = Random.fromList(['john','mary'], '::fixed-value::', ['other', 'list', 'to','apply','random'])
console.log(result()); // 'mary::fixed-value::to'

const result = Random.string('prefix-', 4);
console.log(result()); //prefix-9a9k

//Number as well
const result = Random.number( {min: 2, max: 15, decimals: 3)
console.log(result()); // 7.324

//Date
const result = Random.date( {minYear: 1990, maxYear: 1995, maxMonth: 5)
console.log(result()); // Date object with 1994-03-21 19:10:05

const result = Random.dateWithSpecific( {year:  1998, day:  15, month:  3, hour:  20, minute:  42, seconds:  23})
console.log(result()); // Date object with 1998-3-15 20:42:23
//All args of this method are optional

const result = Random.word();
console.log(result()); //aswade

const result = Random.name();
console.log(result()); //John

const result = Random.lastName();
console.log(result()); //Doe

const result = Random.email();
console.log(result()); //random321@email.com

const result = Random.guid();
console.log(result()); // f0d8368d-85e2-54fb-73c4-2d60374295e3

const result = Random.hash();
console.log(result()); // e5162f27da96ed8e1ae51def1ba643b91d2581d8

const result = Random.char();
console.log(result()); // C

const result = Random.cpf();
console.log(result()); // 111.444.777-35

const result = Random.url();
console.log(result()); // http://domain.com
```
And  you can create your own methods. Just remember of the pattern:
```javascript
const randomPhone = (params) => {
   return () => {
      return Math.random() + params;
   }
};
const result = randomPhone('test');
result(); // 0.312809382109test
```
You can use all of them at your table:
```javascript
't_customer': {
	'id': { 'type':  'int', val:  id.getNext('t_customer') },
	'name': { type:  'string', val:  Random.name() },
	'surname': { type:  'string', val:  Random.lastName() },
	'email': { type:  'string', val: Random.email() },
	'birthDate': { type:  'date', val:  Random.date({ minYear:  1970, maxYear:  2010 }) },
	'creation_date': { type:  'datetime', val:  Random.date({ addTime:  true, minYear:  2018, maxYear:  2022 }) }
}
```

## ID
Helps you create incremental IDs, if you don't want to put them one-by-one.

### INCREMENTAL IDS

```javascript
for(var i=0; i <5; i++){ 
	const result = id.getNext('t_customer');
	console.log(typeof result); // function
	result(); // 1, 2, 3, 4, 5
}
console.log(id.getCurrent('t_customer')()); // 5 - will return the last inserted.

```

#### Example of use:

```javascript
const dbStructure = (id) => {
	't_customer': {
		'id': { 'type':  'int', val:  id.getNext('t_customer') },
	 },
	 't_address': {
		'id': { 'type':  'int', val:  id.getNext('t_address') },
		'customer_id': { 'type':  'int', val:  id.getCurrent('t_customer') },
	 }
};
const initialIds = {
  't_customer': 10
}
insert.add('t_customer', {}); // id = 11
insert.add('t_address', {}); // id = 1, customer_id = 11
insert.add('t_address', {}); // id = 2, customer_id = 11
insert.add('t_customer', {}); // id = 12
insert.add('t_address', {}); // id = 3, customer_id = 12
```

### RANDOM STRING CODES
Other possibility is to generate random codes. They will work the same way as generating ids.

----------


```javascript
for(var i=0; i <5; i++){ 
    //fieldUniqueName, prefix <default = fieldName>, randomLength <default = 5>)
	const result = id.getNextRandomCode('customer.code','customer-', 5);
	console.log(typeof result); // function
	result(); // 'customer-ak20fa | customer-pcka03 ...
}
console.log(id.getCurrentCode('customer.code')()); // customer-pcka03 - will return the last inserted.

```

# Found any problem?
Please, open a issue on github!
[https://github.com/gabrielscarvalho/db-populator/issues](https://github.com/gabrielscarvalho/db-populator/issues)

import { Random } from './src/core/value-generator/random';
import { AutoIncrement } from './src/core/value-generator/auto-increment';
import { LastValue } from './src/core/value-generator/last-value';
import { DateGen } from './src/core/value-generator/date';
import { Fixed } from './src/core/value-generator/fixed';
import { PostgresDatabase } from './src/impl/PostgresDatabase';
import { iDataRow } from './src/interfaces';

const database: PostgresDatabase = new PostgresDatabase();

const autoIncrement = new AutoIncrement();

autoIncrement
  .initialId('user.id', 1)
  .initialId('address.id', 2)
  .initialId('order.id', 200);


const tUser = database.addTable('user')
  .addColumn('id', 'int', autoIncrement.valueGen('user.id'))
  .addColumn('name', 'string', Random.Name())
  .addColumn('lastname', 'string', Random.LastName())
  .addColumn('email', 'string', Random.Email())
  .addColumn('age', 'int', Random.Number(18, 30))
  .addColumn('created_at', 'date', DateGen.between({ year: { min: 2010, max: 2015 }}))
  .addColumn('telephone', 'string', Fixed('55 098915651'));


const tAddress = database.addTable('address')
  .addColumn('id', 'int', autoIncrement.valueGen('address.id'))
  .addColumn('user_id', 'int', LastValue(tUser.getColumn('id')))
  .addColumn('receiver', 'string', Random.Name());


const tOrder = database.addTable('order')
  .addColumn('id', 'int', autoIncrement.valueGen('order.id'))
  .addColumn('user_id', 'int', LastValue(tUser.getColumn('id')))
  .addColumn('user_email', 'string', LastValue(tUser.getColumn('email')))
  .addColumn('delivery_address_id', 'int', LastValue(tAddress.getColumn('id')))
  .addColumn('total_price', 'number', Random.Number(100, 900))
  .addColumn('freight_price', 'number', Random.Number(10, 50))
  .addColumn('item_price', 'number', Random.Number(90, 160))
  .addColumn('discount_price', 'number', Random.Number(10, 30))
  .afterGenerateData((dataRow: iDataRow) => {

    const freight = dataRow.getRawValue('freight_price');
    const items = dataRow.getRawValue('item_price');
    const discount = dataRow.getRawValue('discount_price');

    dataRow.setRawValue('total_price', (items + freight - discount));
    
    return dataRow;
  });

const user = database.insert('user', { name: 'John'});

const address = database.insert('address', {});

const order1 = database.insert('order', {});
const order2 = database.insert('order', {});
const order3 = database.insert('order', {});


const user2 = database.insert('user', { name: 'John'});
const address2 = database.insert('address', {});

console.log(database.toSQL());

console.log('hellow');


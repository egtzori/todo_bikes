import { expressjwt } from 'express-jwt';
import app from './app';
import secret from './secret';
import {idp} from './idp';
import * as todo from './todo';
import {pool} from './db';

async function init() {
  // try DB connection & create table
  try {
    const client = await pool.connect();
    await client.query("CREATE TABLE IF NOT EXISTS todos(id BIGSERIAL, description TEXT, done BOOLEAN DEFAULT FALSE);");
    client.release();
  } catch (ex) {
    console.log("cannot connect to database", ex);
  }


  // use JWT middleware for all but the '/idp' path
  app.use(
    expressjwt({secret, algorithms: ["HS256"]})
    .unless({ path: ["/idp"] })
  );

  // endpoint to get JWT
  app.post('/idp', idp);

  // JWT protected TODO endpoints
  app.get('/', todo.listItems);
  app.post('/', todo.addItem);
  app.put('/', todo.updateItem);
  app.delete('/', todo.deleteItem);

  app.listen(3001);

}


init();

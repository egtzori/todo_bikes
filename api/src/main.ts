import app from './app';
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

  app.listen(3001);
}


init();

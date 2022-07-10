import {Todo} from './types';
import {Client, Pool} from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin@123999',
  port: 5439,
})

// read todos from db
async function listItems():Promise<Todo[]> {
  const client = await pool.connect();
  const list = await client.query("SELECT * FROM todos");
  client.release();
  return list.rows as Todo[];
}

// insert new todo
async function addItem(description:string):Promise<boolean> {
  const client = await pool.connect();
  await client.query("INSERT INTO todos(description) VALUES ($1)", [description]);
  client.release();
  return true;
}

// update todo's done property
async function updateItem(id:number, done:boolean):Promise<boolean> {
  const client = await pool.connect();
  const result = await client.query("UPDATE todos SET done=$2 WHERE id=$1", [id, done]);
  client.release();
  return 1 === result.rowCount;
}

// delete todo
async function deleteItem(id:number):Promise<boolean> {
  const client = await pool.connect();
  const result = await client.query("DELETE FROM todos WHERE id=$1", [id]);
  client.release();
  return 1 === result.rowCount;
}

export {
  pool,
  listItems,
  addItem,
  updateItem,
  deleteItem
}

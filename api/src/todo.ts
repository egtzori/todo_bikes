import { Request, Response } from 'express';
import * as db from './db';
import {Todo} from './types';

// list all TODOs
async function listItems(_req:Request, res: Response) {
  res.status(200).send(await db.listItems());
}


// Add todo - needs body param: description
// on success return 200 "OK", on error 400 "Error"
async function addItem(req:Request, res:Response) {
  const {description} = req.body;
  if (!description) {
    return res.status(400).send("provide body parameter - description");
  }

  const result = await db.addItem(description);
  return res.status(result?200:400).send(result?"OK":"Error");
}

// Update todo (only parameter done), needs body params: id and done
// return 200 on success or 400 on error
async function updateItem(req:Request, res:Response) {
  const {id, done} = req.body;
  if (undefined === id || undefined === done) {
    return res.status(400).send("provide body parameters - id and done");
  }

  const result = await db.updateItem(id, done);
  return res.status(result?200:400).send(result?"OK":"Error");
}

// Delete todo item - needs body param: id
// return 200 on success or 400 on error
async function deleteItem(req:Request, res:Response) {
  const {id} = req.body;
  if (undefined === id) {
    return res.status(400).send("provide body parameter - id");
  }

  const result = await db.deleteItem(id);
  return res.status(result?200:400).send(result?"OK":"Error");
}

export {
  listItems,
  addItem,
  updateItem,
  deleteItem
};

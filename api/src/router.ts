import express, {Request, Response} from 'express';
import { TodoController } from './todoController';

const router = express.Router();

router.get('/', async(_req:Request, res:Response) => {
  const response = await new TodoController().listItems();
  return res.send(response);
});

router.post('/', async(req:Request, res:Response) => {
  if (!req?.body?.description) {
    return res.status(400).send("provide body parameter - description");
  }

  const result = await new TodoController().addItem(req.body);
  return res.status(result?201:400).send(result?"OK":"Error");
});

router.put('/', async(req:Request, res:Response) => {
  console.log(req.body);
  if (undefined === req?.body?.id || undefined === req?.body?.done) {
    return res.status(400).send("provide body parameters - id and done");
  }

  const result = await new TodoController().updateItem(req.body);
  return res.status(result?200:400).send(result?"OK":"Error");
});

router.delete('/', async(req:Request, res:Response) => {
  console.log(req.body);
  if (undefined === req?.body?.id) {
    return res.status(400).send("provide body parameter - id");
  }

  const result = await new TodoController().deleteItem(req.body);
  return res.status(result?200:400).send(result?"OK":"Error");
});

export default router;

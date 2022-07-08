import jwt from 'jsonwebtoken';
import secret from './secret';
import { Request, Response } from 'express';
import twofactor from './twofactor';

// simple IDP - send challenge and response code
// returns JWT on success or 400 on error
export const idp = (req:Request, res:Response) => {
  const {challenge, code} = req.body;
  if (!challenge || !code) {
    return res.status(400).send("provide body params challenge and code");
  }

  const calcCode = twofactor(Number(challenge));

  if (calcCode != code) {
    return res.status(400).send("invalid code");
  }

  const data = {user: 'admin'};
  const token = jwt.sign(JSON.stringify(data), secret);

  return res.status(200).send(token);
};


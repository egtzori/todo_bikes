import express, {Express} from 'express';
import bodyParser from 'body-parser';
import { expressjwt } from 'express-jwt';
import swaggerUi from "swagger-ui-express"
import {idp} from './idp';
import secret from './secret';
import router from './router';
import morgan from 'morgan';

const app:Express = express();
app.use(bodyParser.json());

// add morgan middleware to log http requests
app.use(morgan("tiny"));


// use JWT middleware for all but the /idp, /docs and /public
app.use(
  expressjwt({secret, algorithms: ["HS256"]})
  .unless({ path: [
    { url: /^\/docs.*/ }, 
    { url: /^\/swagger.json/},
    { url: '/idp' }, 
  ]})
);


// setup swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

// need this to server /swagger.json
app.use(express.static("public"));

// endpoint to get JWT
app.post('/idp', idp);

// add todo endpoints
app.use(router);


export default app;


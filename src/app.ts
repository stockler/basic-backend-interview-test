'use strict';

import * as SwaggerExpress from 'swagger-express-mw';
import * as express from 'express';
import { mongoose, connect } from "./api/helpers/db";
import { EventEmitter } from 'events';

const app = express();
const connection = connect();

const event = new EventEmitter();

const config = {
  appRoot: __dirname // required config
};

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', () => {
    SwaggerExpress.create(config, (err, swaggerExpress) => {
      if (err) { throw err; }

      // install middleware
      swaggerExpress.register(app);

      const port = process.env.PORT || 10010;
      app.listen(port, () => {  
        event.emit("started");
        console.log("Server started");
      });
      
    });
  });


export { app, event }; // for testing



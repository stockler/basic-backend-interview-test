import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import * as Promise from 'bluebird';

(<any>mongoose).Promise = Promise;
mongoose.set('debug', true);

const options = { server: { socketOptions: { keepAlive: 1 } } };

let connect = () => {
  return mongoose.connect(`mongodb://${ process.env.DB_HOST }/${ process.env.DB_NAME }`, options).connection;
}

export { mongoose, connect };
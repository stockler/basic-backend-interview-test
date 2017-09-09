'use strict';
import * as util from 'util';
import { Request, Response, NextFunction } from 'express';

class HelloController {
  static hello(req: Request, res: Response, next: NextFunction): Response {

    return res.json({ hello: 'world!' });    
  }
}

export = {
  hello: HelloController.hello
};
 

'use strict';
import * as util from 'util';
import { Request, Response, NextFunction } from 'express';
import * as request from 'request-promise';
import { Neo } from '../models/neo/Neo';
import { HALLink } from '../models/HALLink';
import { NasaService } from '../services/nasa.service';
import * as moment from 'moment';

class NeoController {
  static async getNeosHazardous(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const neos = await Neo.findAllNeosHazardous();

    const hal = new Array<HALLink>();
    const self = new HALLink(`http://${req.hostname}/neo/hazardous`, 'self');
    hal.push(self);

    const response = {
      neos: neos.length, 
      total: neos.length, 
      _links: hal, 
      _embedded: neos
    }

    return res.status(200).json(response);    
  }

  static async getFastestNeo(req: Request, res: Response, next: NextFunction): Promise<Response> {    

    const hazardous = req.query.hazardous === 'true';

    const neo = await Neo.findFastestNeo(hazardous);
    return res.status(200).json(neo);    
  }

  static async getBestYearNeo(req: Request, res: Response, next: NextFunction): Promise<Response> {    
    
    const hazardous = req.query.hazardous === 'true';
  
    const neo = await Neo.findBestYearNeos(hazardous);
    return res.status(200).json(neo);    
  }

  static async getBestMonthNeo(req: Request, res: Response, next: NextFunction): Promise<Response> {    
    
    const hazardous = req.query.hazardous === 'true';
  
    const neo = await Neo.findBestMonthNeos(hazardous);
    return res.status(200).json(neo);    
  }

  static async getLast3DaysNeosFromNasa(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const now = moment();
    const threeDaysBefore = moment(now).subtract(3, 'days');

    let nasaService = NasaService.getInstance();
    
    const neos = await nasaService
      .getLast3DaysNeosFromNasa(threeDaysBefore.format('YYYY-MM-DD'), now.format('YYYY-MM-DD'))
      .catch((err) => {
        return res.status(500).json(util.inspect(err));
      });    
      
    const promiseArray = neos.map((neo) => {

        const criteria = {
          reference: neo.neo_reference_id
        }
      
        const neoData = {
          reference: neo.neo_reference_id,
          name: neo.name,
          speed: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
          is_hazardous: neo.is_potentially_hazardous_asteroid,
          date: neo.close_approach_data[0].close_approach_date
        }

        return Neo.findOneAndUpdate(criteria, neoData, { 
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true 
          });
      });
    
    const insertedNeos = await Promise
      .all(promiseArray)
      .then((results) => {
        return results;
      })
      .catch((err) => {
        return res.status(500).json(util.inspect(err));
      });

    return res.status(200).json(insertedNeos);
  }
}

export = {
  getNeosHazardous: NeoController.getNeosHazardous,
  getFastestNeo: NeoController.getFastestNeo,
  getBestYearNeo: NeoController.getBestYearNeo,
  getBestMonthNeo: NeoController.getBestMonthNeo,
  getLast3DaysNeosFromNasa: NeoController.getLast3DaysNeosFromNasa
};
 

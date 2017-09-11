import * as request from 'request-promise';
import { Neo } from '../models/neo/Neo';

export class NasaService {
  private static instance: NasaService;
  private apiKey: String;
  private url: String;

  private constructor() {
    this.url = 'https://api.nasa.gov/neo/rest/v1';
    this.apiKey = process.env.NASA_API_KEY;
  }

  static getInstance() {
    if (!NasaService.instance) {
      NasaService.instance = new NasaService();
    }
    return NasaService.instance;
  }

  getLast3DaysNeosFromNasa(dateStart, dateEnd) { 

    const url = `${this.url}/feed?start_date=${dateStart}&end_date=${dateEnd}&detailed=true&api_key=${this.apiKey}`;

    return request
      .get(url)
      .then((response) => {
        const neos = JSON.parse(response);

        return Object
          .keys(neos.near_earth_objects)
          .map((key) => {
            return neos.near_earth_objects[key];
          })
          .reduce((current, next) => {
            return current.concat(next);
          }, []);
      });
  }
}


import { Model } from 'mongoose';
import { INeo } from './INeo';

export interface INeoModel extends Model<INeo> {
    findAllNeosHazardous: () => Promise<Array<INeo>>;
    findFastestNeo: (hazardous?: Boolean) => Promise<INeo>;
    findBestYearNeos: (hazardous?: Boolean) => Promise<INeo>;
    findBestMonthNeos: (hazardous?: Boolean) => Promise<INeo>;
}
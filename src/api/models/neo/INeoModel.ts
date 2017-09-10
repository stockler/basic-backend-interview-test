import { Model } from 'mongoose';
import { INeo } from './INeo';

export interface INeoModel extends Model<INeo> {
    generate: () => Promise<Array<INeo>>;
}
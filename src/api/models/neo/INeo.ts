import { Document } from 'mongoose';

export interface INeo extends Document {
    date: Date;
    reference: String;
    name: String;
    speed: Number;
    is_hazardous: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

import { mongoose } from "../../helpers/db";
import { Schema, Model } from "mongoose";
import { INeo } from './INeo';
import { INeoModel } from './INeoModel';

const schema: Schema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  reference: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String
  },
  speed: {
    type: Number
  },
  is_hazardous: {
    type: Boolean
  },  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})
  .pre('save', function (next) {
    if (this._doc) {
      let doc = <INeo>this._doc;
      let now = new Date();
      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.updatedAt = now;
    }
    next();
    return this;
  });

schema.statics.findOrCreateFBAuth = (accessToken, refreshToken, profile) => {
  return this.findOne({
    'facebookProvider.id': profile.id
  }, (err, auth) => {
    if (!auth) {
      return this.create({
        email: profile.emails[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      });
    } 
    
    return auth;
  });
};

export const Neo: Model<INeo> = mongoose.model<INeo, INeoModel>("Neo", schema);
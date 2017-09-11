import { mongoose } from "../../helpers/db";
import { Schema, Model } from "mongoose";
import { INeo } from './INeo';
import { INeoModel } from './INeoModel';
import * as moment from 'moment';

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

schema.statics.findAllNeosHazardous = function () {
  return this.find({ is_hazardous: true });  
}

schema.statics.findFastestNeo = function (hazardous = false) {
  return this
    .findOne({ is_hazardous: hazardous})
    .sort({ speed: -1 });  
}

schema.statics.findAllNeosHazardous = function () {
  return this.find({ is_hazardous: true });  
}

schema.statics.findBestYearNeos = function(hazardous = false) {
  const options = [];

  options.push({
    $match: { 
      is_hazardous: hazardous,
      date: { 
        $exists: true, 
        $ne: null 
      }      
    }
  });

  options.push({
    $project: { 
      year: { 
        $year: "$date"
      },
      is_hazardous: 1
    }
  }); 

  options.push({
    $sortByCount: "$year"
  });

  options.push({
    $limit: 1
  });
  
  return this.aggregate(options)
    .then((results) => {
      
      if (results && results.length > 0) {
        const year = results[0]._id;

        return {
          year: year,
          count: results[0].count
        }
      }
    
      return 0;
    
    });
}

schema.statics.findBestMonthNeos = function(hazardous = false, byMonth = false) {
  const options = [];

  let criteria;

  options.push({
    $match: { 
      is_hazardous: hazardous,
      date: { 
        $exists: true, 
        $ne: null 
      }      
    }
  });

  options.push({
    $project: { 
      date: 1,
      is_hazardous: 1
    }
  });  
  
  options.push({
    $group: {
      _id: {
        month: { 
          $month: "$date"
        }
      },
      count: { 
        $sum: 1 
      }
    }
  });  

  options.push({
    $sort: { 
      count: -1 
    }
  });

  options.push({
    $limit: 1
  });

  return this.aggregate(options)
    .then((results) => {

      if (results && results.length > 0) {
        const month = results[0]._id.month;
        const year = results[0]._id.year;

        let monthStr = month.toString();

        if (month < 10) {
          monthStr = '0' + monthStr;
        }

        let date = moment(`2000-${monthStr}-01`)
        return {
          month: date.format('MMMM'),
          count: results[0].count
        }
      }

      return 0;

    });

}

export const Neo: INeoModel = mongoose.model<INeo, INeoModel>("Neo", schema);
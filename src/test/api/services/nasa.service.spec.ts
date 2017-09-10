import { expect, should } from 'chai';
import { NasaService } from '../../../api/services/nasa.service';
import * as nock from 'nock';
import * as fs from 'fs';


let nasaService;
let mockNeosJSON;


// const neos = await nasaService
// .getLast3DaysNeosFromNasa(threeDaysBefore, now)
// .catch((err) => {
//   return res.status(500).json(util.inspect(err));
// });

describe('services', () => {

  before((done) => {  
    nasaService = NasaService.getInstance();

    console.log(__dirname);

    //mockNeosJSON = fs.readFileSync('../../../api/mocks/response-feed.json', 'utf8');
    mockNeosJSON = fs.readFileSync(__dirname +'/feed.json');

    nock('https://api.nasa.gov')
      .get('/neo/rest/v1/feed')
      .query({
        start_date: '2017-09-07', 
        end_date: '2017-09-07',
        detailed: true,
        api_key: 'N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD'
      })
      .reply(200, mockNeosJSON);

    done();
  });

  describe('NasaService', () => {   
      
    it('should exists', (done) => {    
      should().exist(nasaService);
      done();
    });

    describe('.getLast3DaysNeosFromNasa()', () => {

      it('should method exists', (done) => {
        should().exist(nasaService.getLast3DaysNeosFromNasa);
        done();
      });

      it('should return array', (done) => {
        nasaService
          .getLast3DaysNeosFromNasa('2017-09-07', '2017-09-07')
          .then((neos) => {
            expect(neos).to.be.a('array');
            expect(neos.length).to.be.equal(7);
    
            done();
          });        
      });
    });
  });
});

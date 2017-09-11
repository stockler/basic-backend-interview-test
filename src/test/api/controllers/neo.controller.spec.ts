import { expect, should } from 'chai';
import * as request from 'supertest';
import { app, event } from '../../../app';

describe('controllers', () => {

  describe('Neo', () => {

    describe('GET /getLast3DaysNeosFromNasa', () => {
      
      it('should return a array NEOs inserted on DB', (done) => {
    
        request(app)
          .get('/getLast3DaysNeosFromNasa')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);
    
            expect(res.body).to.be.a('array');

            const neos = res.body;

            if (neos.length > 0) {
              expect(neos[0]).to.be.property('name');
              expect(neos[0]).to.be.property('reference');
              expect(neos[0]).to.be.property('speed');
              expect(neos[0]).to.be.property('is_hazardous');
              expect(neos[0]).to.be.property('date');
            }
    
            done();
          });
      });
    });

    describe('GET /neo/hazardous', () => {

      it('should return a object', (done) => {

        request(app)
          .get('/neo/hazardous')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);

            expect(res.body).to.be.a('object');
            expect(res.body).to.be.property('neos');
            expect(res.body).to.be.property('total');
            expect(res.body).to.be.property('_links');
            expect(res.body).to.be.property('_embedded');

            const neos = res.body._embedded;
            
            if (neos.length > 0) {
              expect(neos[0]).to.be.property('name');
              expect(neos[0]).to.be.property('reference');
              expect(neos[0]).to.be.property('speed');
              expect(neos[0]).to.be.property('is_hazardous');
              expect(neos[0]).to.be.property('date');
            }

            done();
          });
      });
    });

    describe('GET /neo/fastest', () => {
        
      it('should return a NEO object', (done) => {
    
        request(app)
          .get('/neo/fastest')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);
    
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.property('name');
            expect(res.body).to.be.property('reference');
            expect(res.body).to.be.property('speed');
            expect(res.body).to.be.property('is_hazardous');
            expect(res.body).to.be.property('date');
    
            done();
          });
      });
    });

    describe('GET /neo/fastest?hazardous=true', () => {
      
      it('should return a NEO object', (done) => {
    
        request(app)
          .get('/neo/fastest?hazardous=true')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);
    
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.property('name');
            expect(res.body).to.be.property('reference');
            expect(res.body).to.be.property('speed');
            expect(res.body).to.be.property('is_hazardous');
            expect(res.body).to.be.property('date');
    
            done();
          });
      });
    });

    describe('GET /neo/best-year', () => {
      
      it('should return a object', (done) => {
    
        request(app)
          .get('/neo/best-year')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);
    
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.property('year');
            expect(res.body).to.be.property('count');
    
            done();
          });
      });
    });

    describe('GET /neo/best-year?hazardous=true', () => {
      
      it('should return a object', (done) => {
    
        request(app)
          .get('/neo/best-year?hazardous=true')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);
    
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.property('year');
            expect(res.body).to.be.property('count');
    
            done();
          });
      });
    });

    describe('GET /neo/best-month', () => {
      
      it('should return a object', (done) => {
    
        request(app)
          .get('/neo/best-month')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);
    
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.property('month');
            expect(res.body).to.be.property('count');
    
            done();
          });
      });
    });

    describe('GET /neo/best-month?hazardous=true', () => {
      
      it('should return a object', (done) => {
    
        request(app)
          .get('/neo/best-month?hazardous=true')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);
    
            expect(res.body).to.be.a('object');
            expect(res.body).to.be.property('month');
            expect(res.body).to.be.property('count');

            done();
          });
      });
    });

  });

});

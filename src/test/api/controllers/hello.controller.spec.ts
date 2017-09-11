import { expect, should } from 'chai';
import * as request from 'supertest';
import { app, event } from '../../../app';

before((done) => {  
  event.on("started", () => {
      done();
  });
});


describe('controllers', () => {

  describe('hello world', () => {

    describe('GET /', () => {

      it('should return a default string', (done) => {

        request(app)
          .get('/')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should().not.exist(err);

            expect(res.body).to.be.a('object');

            expect(res.body.hello).to.equal('world!');

            done();
          });
      });
    });
  });
});

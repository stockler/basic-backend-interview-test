import { expect, should } from 'chai';
import * as request from 'supertest';
import { app, event } from '../../../app';

before(function (done) {  
  event.on("started", function(){
      done();
  });
});


describe('controllers', function() {

  describe('hello world', function() {

    describe('GET /', function() {

      it('should return a default string', function(done) {

        request(app)
          .get('/')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should().not.exist(err);

            expect(res.body).to.be.a('object');

            expect(res.body.hello).to.equal('world!');

            done();
          });
      });

      // it('should accept a name parameter', function(done) {

      //   request(server)
      //     .get('/hello')
      //     .query({ name: 'Scott'})
      //     .set('Accept', 'application/json')
      //     .expect('Content-Type', /json/)
      //     .expect(200)
      //     .end(function(err, res) {
      //       should.not.exist(err);

      //       res.body.should.eql('Hello, Scott!');

      //       done();
      //     });
      // });

    });

  });

});

/* eslint-disable import/no-named-as-default */
import request from 'supertest';
import { expect } from 'chai';
import dbClient from '../../utils/db';

describe('+ AppController', () => {
  before(function (done) {
    this.timeout(10000); // Increase timeout for async operations
    Promise.all([dbClient.usersCollection(), dbClient.filesCollection()])
      .then(([usersCollection, filesCollection]) => {
        Promise.all([usersCollection.deleteMany({}), filesCollection.deleteMany({})])
          .then(() => done())
          .catch((deleteErr) => done(deleteErr));
      })
      .catch((connectErr) => done(connectErr));
  });

  describe('+ GET: /status', () => {
    it('+ Services are online', function (done) {
      request('http://localhost:5000')
        .get('/status')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.eql({ redis: true, db: true });
          done();
        });
    });
  });

  describe('+ GET: /stats', () => {
    it('+ Correct statistics about db collections (empty)', function (done) {
      request('http://localhost:5000')
        .get('/stats')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.deep.eql({ users: 0, files: 0 });
          done();
        });
    });

    it('+ Correct statistics about db collections (with data)', function (done) {
      this.timeout(10000); // Increase timeout for async operations
      Promise.all([
        dbClient.usersCollection().then((coll) => coll.insertMany([{ email: 'john@mail.com' }])),
        dbClient.filesCollection().then((coll) => coll.insertMany([
          { name: 'foo.txt', type: 'file' },
          { name: 'pic.png', type: 'image' },
        ]))
      ])
        .then(() => {
          request('http://localhost:5000')
            .get('/stats')
            .expect(200)
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              expect(res.body).to.deep.eql({ users: 1, files: 2 });
              done();
            });
        })
        .catch((insertErr) => done(insertErr));
    });
  });
});

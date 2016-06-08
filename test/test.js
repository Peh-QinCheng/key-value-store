var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:3000');

describe('Querying', function() {

  it('returns string when queried', function(done) {
    api.get('/object/key')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200,'Object not found!',done)
  });

  it('returns string when queried with timestamp', function(done) {
    api.get('/object/key?timestamp=1465401329134')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200,'Object not found!', done)
  });

});

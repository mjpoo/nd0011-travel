const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

// Remember that server can not already be running when this test is done

describe('Test server endpoint', () => {
    it('get test endpoint', function(done) {
        request
            .get('/testserver')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(JSON.stringify({ test: 'test passed' }))
            .expect(200, done);
    });
});
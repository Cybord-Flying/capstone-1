const { server, handle } = require('../index');
<<<<<<< HEAD
const { client } = require('../db');
=======
const { client } = require('../db/DB_cyborg flying');
>>>>>>> a0fd15e92487a3230cdcbf61ca6c47cb81ca34dd
const supertest = require('supertest');
const request = supertest(server);

describe('/api/health endpoint', () => {
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it('should respond with { healthy: true }', async () => {
    const response = await request.get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });
});

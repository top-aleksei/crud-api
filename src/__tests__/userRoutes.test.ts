import server from '../index';
import request from 'supertest';

const testUsers = {
  user1: {
    username: '1st test user',
    age: 30,
    hobbies: ['reading', 'gaming'],
  },
};

afterAll(() => {
  server && server.close();
});

describe('1st scenario', () => {
  let userId: string;
  it('get /api/users should return []', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /api/users should create a new user', async () => {
    const response = await request(server).post('/api/users').send(testUsers.user1);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(testUsers.user1.username);
    userId = response.body.id;
  });

  it('get /api/users should return 1st test user', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ ...testUsers.user1, id: userId }]);
  });

  it('PUT /api/users/:id should update the user', async () => {
    console.log('userId: ', userId);
    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send({ username: 'updated user' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...testUsers.user1, id: userId, username: 'updated user' });
  });

  it('DELETE /api/users/:id should delete the user', async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: `User '${userId}' has been deleted` });
  });

  it('get /api/users/:id unexisted user should return 404', async () => {
    console.log('userId: ', userId);
    console.log(userId.match(/^[a-zA-Z0-9-]+$/));
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: `User with ID: '${userId}' doesn't exist` });
  });
});

describe('2nd scenario', () => {
  it('POST /api/users should return 400 if body is empty', async () => {
    const response = await request(server).post('/api/users').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Body request doesnt contain required fields' });
  });

  it('POST /api/users should return 400 if body is missing required fields', async () => {
    const response = await request(server).post('/api/users').send({ username: 'test user' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Body request doesnt contain required fields' });
  });
});

describe('3rd scenario', () => {
  it('GET /api/users/:id should return 400 if id is not valid', async () => {
    const response = await request(server).get('/api/users/1');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'user ID in not valid (not uuid)' });
  });

  it('PUT /api/users/:id should return 404 if id is not valid', async () => {
    const response = await request(server).put('/api/users/1');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'user ID in not valid (not uuid)' });
  });

  it('PATCH shoud return invalid method', async () => {
    const response = await request(server).patch('/api/users');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid http method' });
  });

  it('GET invalid endpoint should return 404', async () => {
    const response = await request(server).get('/api/invalid');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Invalid endpoint' });
  });
});

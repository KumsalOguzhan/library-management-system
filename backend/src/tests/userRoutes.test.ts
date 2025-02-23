import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

describe('User Endpoints', () => {

  beforeAll(async () => {

    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: [
        { name: 'Test User 1', email: 'test1@example.com' },
        { name: 'Test User 2', email: 'test2@example.com' },
      ],
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET /users should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('GET /users/:id should return user details for a valid id', async () => {
    const user = await prisma.user.findFirst();
    if (!user) throw new Error('Test user not found');

    const res = await request(app).get(`/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', user.id);
    expect(res.body).toHaveProperty('books');
  });

  it('GET /users/:id with invalid id should return 400', async () => {
    const res = await request(app).get('/users/abc');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });
});

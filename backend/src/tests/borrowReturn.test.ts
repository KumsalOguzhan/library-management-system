import request from 'supertest';
import app from '../app';
import prisma from '../config/prisma';

describe('Borrow and Return Endpoints', () => {
  let testUserId: number;
  let testBookId: number;

  beforeAll(async () => {
    await prisma.borrowedBook.deleteMany();
    await prisma.user.deleteMany();
    await prisma.book.deleteMany();

    const user = await prisma.user.create({
      data: { name: 'Borrow Tester', email: 'borrow@test.com' },
    });

    // await prisma.user.create({
    //   data: { name: 'Return Tester', email: 'return@test.com' },
    // });

    const book = await prisma.book.create({
      data: { title: 'Test Book', author: 'Author', publishedAt: new Date() },
    });

    testUserId = user.id;
    testBookId = book.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('POST /users/:userId/borrow/:bookId should allow borrowing a book and return 204 with no content', async () => {
    const res = await request(app).post(`/users/${testUserId}/borrow/${testBookId}`);
    expect(res.statusCode).toEqual(204);

    expect(res.text).toEqual('');

    const borrowRecord = await prisma.borrowedBook.findFirst({
      where: { userId: testUserId, bookId: testBookId, returnedAt: null },
    });
    expect(borrowRecord).not.toBeNull();
  });

  it('POST /users/:userId/borrow/:bookId should not allow borrowing an already borrowed book', async () => {
    const res = await request(app).post(`/users/${testUserId}/borrow/${testBookId}`);
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Bu kitap zaten ödünç alınmış.');
  });

  it('POST /users/:userId/return/:bookId should allow returning a borrowed book and return 204 with no content', async () => {
    const res = await request(app)
      .post(`/users/${testUserId}/return/${testBookId}`)
      .send({ score: 8 });
    expect(res.statusCode).toEqual(204);
    expect(res.text).toEqual('');

    const borrowRecord = await prisma.borrowedBook.findFirst({
      where: { userId: testUserId, bookId: testBookId },
    });
    expect(borrowRecord?.returnedAt).not.toBeNull();

    const ratingRecord = await prisma.rating.findFirst({
      where: { userId: testUserId, bookId: testBookId },
    });
    expect(ratingRecord?.score).toEqual(8);
  });

  it('POST /users/:userId/return/:bookId should not allow returning a book already returned', async () => {
    const res = await request(app)
      .post(`/users/${testUserId}/return/${testBookId}`)
      .send({ score: 7 });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });
});

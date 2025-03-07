import { faker } from "@faker-js/faker";
import prisma from "../src/config/prisma";
import dotenv from 'dotenv';

dotenv.config();

const cleanDb = process.env.cleanDb === 'true';
const userCount = parseInt(process.env.userCount || '0');
const bookCount = parseInt(process.env.bookCount || '0');

async function main() {
  console.log('🌱 Seeding the database...');
  if (cleanDb) {
    try {

      console.log('🗑️ Cleaning the database...');
      await prisma.rating.deleteMany();
      await prisma.borrowedBook.deleteMany();
      await prisma.user.deleteMany();
      await prisma.book.deleteMany();
      console.log('✅ Database cleaned.');

    } catch (error) {
      console.error('An error occurred while cleaning the database.', error);
    }
  }

  try {

    if (userCount > 0) {
      const users = Array.from({ length: userCount }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      }));

      const res = await prisma.user.createMany({ data: users });
      console.log(`📦 ${res.count} users added.`);
    }

    if (bookCount > 0) {
      const books = Array.from({ length: bookCount }).map(() => ({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        publishedAt: faker.date.past(),
      }));

      const res = await prisma.book.createMany({ data: books });
      console.log(`📚 ${res.count} books added.`);
    }

  } catch (error) {
    console.error("An error occurred while adding test data.", error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

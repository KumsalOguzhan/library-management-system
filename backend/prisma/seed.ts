import prisma from "../src/config/prisma";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Ahmet", email: "ahmet@example.com" },
      { name: "Mehmet", email: "mehmet@example.com" },
      { name: "Ayşe", email: "ayse@example.com" },
      { name: "Fatma", email: "fatma@example.com" },
      { name: "Ali", email: "ali@example.com" },
    ],
  });

  await prisma.book.createMany({
    data: [
      { title: "Foundation", author: "Isaac Asimov", publishedAt: new Date("1951-06-01") },
      { title: "Foundation and Empire", author: "Isaac Asimov", publishedAt: new Date("1952-10-01") },
      { title: "Second Foundation", author: "Isaac Asimov", publishedAt: new Date("1953-11-01") },
      { title: "The Stars, Like Dust", author: "Isaac Asimov", publishedAt: new Date("1951-01-01") },
      { title: "The Currents of Space", author: "Isaac Asimov", publishedAt: new Date("1952-01-01") },
      { title: "Pebble in the Sky", author: "Isaac Asimov", publishedAt: new Date("1950-01-01") },
    ],
  });

  console.log("📦 Test data added.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

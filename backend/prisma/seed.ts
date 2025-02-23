import prisma from "../src/config/prisma";

async function main() {
    await prisma.user.createMany({
        data: [
            { name: "Ahmet", email: "ahmet@example.com" },
            { name: "Mehmet", email: "mehmet@example.com" },
        ],
    });

    await prisma.book.createMany({
        data: [
            { title: "Dune", author: "Frank Herbert", publishedAt: new Date("1965-08-01") },
            { title: "1984", author: "George Orwell", publishedAt: new Date("1949-06-08") },
        ],
    });

    console.log("📦 Test data added.");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

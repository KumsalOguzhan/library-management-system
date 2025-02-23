import prisma from '../config/prisma';

export const fetchUsers = async () => {

  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const fetchUserDetails = async (userId: number) => {

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      borrowedBooks: {
        include: {
          book: true,
        },
      },
    },
  });

  if (!user) return null;

  const presentBooks = user.borrowedBooks
    .filter(bb => bb.returnedAt === null)
    .map(bb => bb.book);

  const pastBooks = user.borrowedBooks
    .filter(bb => bb.returnedAt !== null)
    .map(bb => {
      return { ...bb.book, userScore: null };
    });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    books: {
      present: presentBooks,
      past: pastBooks,
    },
  };
};

export const borrowBookService = async (userId: number, bookId: number) => {

  const activeBorrow = await prisma.borrowedBook.findFirst({
    where: {
      bookId,
      returnedAt: null,
    },
  });

  if (activeBorrow) {
    throw new Error('Bu kitap zaten ödünç alınmış.');
  }

  return prisma.borrowedBook.create({
    data: {
      userId,
      bookId,
      borrowedAt: new Date(),
      returnedAt: null,
    },
  });
};

export const returnBookService = async (userId: number, bookId: number, score?: number) => {
  const borrowRecord = await prisma.borrowedBook.findFirst({
    where: {
      userId,
      bookId,
      returnedAt: null,
    },
  });

  if (!borrowRecord) {
    throw new Error('Aktif ödünç kaydı bulunamadı.');
  }

  await prisma.borrowedBook.update({
    where: { id: borrowRecord.id },
    data: {
      returnedAt: new Date(),
    },
  });

  if (typeof score === 'number') {
    await prisma.rating.create({
      data: {
        userId,
        bookId,
        score,
      },
    });
  }
};
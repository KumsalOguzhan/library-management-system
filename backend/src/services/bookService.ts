import prisma from '../config/prisma';

export const fetchBooks = async () => {
    return prisma.book.findMany({
        select: {
            id: true,
            title: true,
        },
    });
};

export const fetchBookDetails = async (bookId: number) => {
    const book = await prisma.book.findUnique({
        where: { id: bookId },
        include: {
            ratings: true,
            borrowedBy: {
                include: {
                    user: true,
                },
            },
        },
    });

    if (!book) return null;

    let averageRating = -1;
    if (book.ratings && book.ratings.length > 0) {
        const totalScore = book.ratings.reduce((sum, rating) => sum + rating.score, 0);
        averageRating = parseFloat((totalScore / book.ratings.length).toFixed(2));
    }

    const activeBorrow = book.borrowedBy.find(bb => bb.returnedAt === null);
    const currentOwner = activeBorrow ? activeBorrow.user : null;

    return {
        id: book.id,
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt,
        averageRating,
        currentOwner,
    };
};

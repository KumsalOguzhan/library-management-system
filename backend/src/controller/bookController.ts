import { Request, Response, NextFunction } from 'express';
import { fetchBookDetails, fetchBooks } from '../services/bookService';

export const getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const books = await fetchBooks();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bookId = parseInt(req.params.id, 10);
        if (isNaN(bookId)) {
            res.status(400).json({ error: 'Geçersiz kitap ID' });
            return;
        }
        const book = await fetchBookDetails(bookId);
        if (!book) {
            res.status(404).json({ error: 'Kitap bulunamadı' });
            return;
        }
        res.json(book);
    } catch (error) {
        next(error);
    }
};

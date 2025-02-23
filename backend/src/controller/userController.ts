import { NextFunction, Request, Response } from 'express';
import { borrowBookService, fetchUserDetails, fetchUsers, returnBookService } from '../services/userService';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: 'Geçersiz kullanıcı ID' });
      return;
    }

    const user = await fetchUserDetails(userId);

    if (!user) {
      res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);

    if (isNaN(userId) || isNaN(bookId)) {
      res.status(400).json({ error: 'Geçersiz kullanıcı veya kitap ID' });
      return;
    }

    await borrowBookService(userId, bookId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.params.bookId, 10);

    if (isNaN(userId) || isNaN(bookId)) {
      res.status(400).json({ error: 'Geçersiz kullanıcı veya kitap ID' });
      return;
    }

    const { score } = req.body;
    await returnBookService(userId, bookId, score);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
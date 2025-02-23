import { Router } from 'express';
import { borrowBook, getUserById, getUsers, returnBook } from '../controller/userController';


const router = Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/:userId/borrow/:bookId', borrowBook);

router.post('/:userId/return/:bookId', returnBook);

export default router;

import { Router } from 'express';
import { getBooks, getBookById } from '../controller/bookController';

const router = Router();

router.get('/', getBooks);

router.get('/:id', getBookById);

export default router;

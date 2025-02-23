import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use('/books', bookRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.get("/", async (req, res) => {
  res.send("Library Management");
});

export default app;
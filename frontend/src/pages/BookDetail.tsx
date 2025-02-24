import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/books/getBookById';

interface BookDetailProps {
  title: string;
  author: string;
  description: string;
  publishedDate: string;
}

const BookDetail: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetailProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await getBookById({ bookId: Number(id) });
        if (res) {
          setBook(res);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <p><strong>Published Date:</strong> {book.publishedDate}</p>
    </div>
  );
};

export default BookDetail;
import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { getBooks } from '../services/books/getBooks';

interface Book {
  id: number;
  title: string;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const res = await getBooks();
        if (res.books && res.books.length > 0) {
          setBooks(res.books);
        }
      } catch (err: any) {
        setError(err.message || 'Kullanıcılar alınırken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    getAllBooks();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Books</h1>
      <BookList books={books} />
    </div>
  );
};

export default Books;
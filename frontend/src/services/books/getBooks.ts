import api from "../api";

interface GetBooksResponse {
  books: Book[];
}

interface Book {
  id: number;
  title: string;
}

export const getBooks = async (): Promise<GetBooksResponse> => {
  const response = await api.get('/books');
  return response.data;
}
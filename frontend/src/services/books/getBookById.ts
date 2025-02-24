import api from "../api";

interface GetBookByIdResponse {
  title: string;
  author: string;
  description: string;
  publishedDate: string;
}

interface GetBookByIdRquest {
  bookId: number;
}

export const getBookById = async (req: GetBookByIdRquest): Promise<GetBookByIdResponse> => {
  const response = await api.get(`/books/${req.bookId}`);
  return response.data;
}
import api from "../api";

interface ReturnBookRequest {
  userId: number;
  bookId: number;
  score: number;
}

interface ReturnBookResponse {
  success: boolean;
}

export const returnBook = async (req: ReturnBookRequest): Promise<ReturnBookResponse> => {
  const response = await api.post(`/users/${req.userId}/return/${req.bookId}`, { score: req.score });
  return response.status === 204 ? { success: true } : { success: false };
};

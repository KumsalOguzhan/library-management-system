import api from "../api";

interface BorrowBookRequest {
  userId: number;
  bookId: number;
}

interface BorrowBookResponse {
  success: boolean;
}

export const borrowBook = async (req: BorrowBookRequest): Promise<BorrowBookResponse> => {
  const response = await api.post(`/users/${req.userId}/borrow/${req.bookId}`);
  return response.status === 204 ? { success: true } : { success: false };
};
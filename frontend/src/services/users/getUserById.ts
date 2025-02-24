import api from "../api";

interface GetUserByIdRequest {
  userId: number;
}

interface GetUserByIdResponse {
  id: number;
}

export const getUserById = async (req: GetUserByIdRequest): Promise<GetUserByIdResponse> => {
  const response = await api.get(`/users/${req.userId}`);
  return response.data;
};
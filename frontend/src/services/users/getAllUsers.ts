import api from "../api";

interface GetAllUsersResponse {
  users: User[];
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const response = await api.get('/users');
  return response.data;
};
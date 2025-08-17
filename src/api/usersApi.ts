import axios from "axios";

export type User = {
  id: string;
  fullName: string;
  age: number;
  jobTitle: string;
  location: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  gender: string;
};

export type CreateUser = Omit<User, "id">;

const api = axios.create({
  baseURL: "https://68a1eee36f8c17b8f5db21c6.mockapi.io",
});

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>("/users");
  return res.data;
};

export const createUser = async (payload: CreateUser): Promise<User> => {
  const res = await api.post<User>("/users", payload);
  return res.data;
};

export const updateUser = async (
  id: string,
  payload: Partial<CreateUser>
): Promise<User> => {
  const res = await api.put<User>(`/users/${id}`, payload);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

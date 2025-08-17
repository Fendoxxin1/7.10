import axios from "axios";

export type User = {
  id: string;
  fullName: string;
  age: number;
  jobTitle: string;
  location: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users");
  return data;
};

export const createUser = async (user: User): Promise<User> => {
  const { data } = await api.post("/users", user);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

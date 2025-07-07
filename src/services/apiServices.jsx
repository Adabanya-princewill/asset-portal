import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true,
});


export const login = async (username, password, setUser) => {
  const res = await api.post("/auth/login", { username, password });
  const user = res.data.data[0]; // extract the first user object from the array
  setUser({ username: user.username, role: user.role, id: user.id });
  return res.data.data;
};

export const createAccount = async (email, password, role) => {
  const res = await api.post("/auth/login", { email, password, role });
  // api.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
  return res.data;
};

export const refreshToken = async () => {
  const res = await api.post("/auth/refresh-token");
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data.data;
};

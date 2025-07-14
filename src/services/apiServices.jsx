import axios from "axios";

// backend URL
const baseUrl = "http://Localhost:9000/api";

const api = axios.create({
  baseURL: baseUrl,
});

// Adds token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password, setUser, setToken) => {
  const res = await api.post(`/auth/login`, { username, password });
  console.log("Login successful:", res.data);
  
  const accessToken = res.data.accessToken;
  const user = res.data.data[0];
  
  // Store in localStorage
  localStorage.setItem("token", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
  
  // Update context state
  setUser({ username: user.username, role: user.role, id: user.id });
  setToken(accessToken);
  
  return user;
};

export const refreshToken = async () => {
  try {
    const response = await api.post(`/auth/refresh-token`);
    const newToken = response.data.accessToken;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "http://localhost:5173/login";
    throw error;
  }
};

export const getDepartments = async () => {
  try {
    const response = await api.get(`/ad/all-departments`);
    return response.data.data || [];

  } catch (error) {
    console.error("Failed to fetch departments:", error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get(`/auth/user/profile`);
    const user = response.data.data[0];
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    const status = error?.response?.status;
    if (status === 401) {
      // Token expired, try to refresh and retry once
      try {
        await refreshToken();
        const retryResponse = await api.get(`/auth/user/profile`);
        const user = retryResponse.data.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } catch (retryError) {
        // If refresh or retry fails, clear storage and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "http://localhost:5173/login";
        throw retryError;
      }
    }
    // For other errors, just throw
    throw error;
  }
};

export const logout = (setUser, setToken) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  setToken(null);
};

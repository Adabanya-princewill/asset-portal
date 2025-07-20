import axios from "axios";

// backend URL
const baseUrl = "http://localhost:9000/api";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

let isRefreshing = false;

// refresh token if 401 and try the original request again
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Do not retry for login or refresh-token calls
    const isLogin = originalRequest.url.includes('/auth/login');
    const isRefresh = originalRequest.url.includes('/auth/refresh-token');

    if (error.response?.status === 401 && !originalRequest._retry && !isLogin && !isRefresh) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          const newToken = await refreshToken();
          isRefreshing = false;

          // Update token in header and retry original request
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'http://localhost:5173/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


// Adds token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password, setUser, setToken) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    if (response.data?.code === "200") {
      const { accessToken, data } = response.data;

      const user = data[0];

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Update app state
      setUser({
        username: user.username,
        role: user.role,
        id: user.id,
      });

      setToken(accessToken);

      console.log('Login successful');

      return response.data?.data;
    } else {
      throw new Error(response.data?.message || "Invalid credential");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
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
    throw error;
  }
};

export const getLocations = async () => {
  try {
    const response = await api.get(`/ad/all-location`);
    return response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get(`/ad/all-category`);
    return response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

export const getAllAssets = async () => {
  try {
    const response = await api.get(`/cs/all-assets`);
    return response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch assets:", error);
    throw error;
  }
};

export const getAssetByStatus = async (status) => {
  try {
    const response = await api.get(`/ic/assets?status=${status}`);
    return response.data.data || [];
  } catch (error) {
    console.error("Failed to fetch assets for approval:", error);
    throw error;
  }
};

export const deleteUser = async (employeeId) => {
  try {
    const response = await api.delete(`/auth/delete?employeeId=${employeeId}`);
    return response;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};


export const createUser = async (formData) => {
  try {
    const response = await api.post(`/auth/create-user`, formData);

    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "User creation failed");
    }

  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};

export const transferAsset = async (payload) => {
  try {
    const response = await api.post(`/cs/asset/transfer`, payload);

    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Asset transfer failed");
    }

  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};


export const retrieveAsset = async (retrievalType, payload) => {
  try {
    if (retrievalType === 'all') {
      const response = await api.put(`/cs/asset/retrieve-all`, payload);
      if (response.data?.code === "200") {
        return response.data?.message;
      } else {
        throw new Error(response.data?.message || "Asset retrieval failed");
      }
    } else {
      const response = await api.put(`/cs/asset/retrieve`, payload);
      if (response.data?.code === "200") {
        return response.data?.message;
      } else {
        throw new Error(response.data?.message || "Asset retrieval failed");
      }
    }


  } catch (error) {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
};


export const EditUserRole = async (username, role) => {
  try {
    const response = await api.put(`/ad/edit-role`, { username, role });
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to edit role");
    }
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || error.message || "Failed to edit user role";
    throw new Error(message);
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


export const createDepartment = async (payload) => {
  try {
    const response = await api.post("/ic/create-department", payload);
    if (response.data?.code === "201") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to create department");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to create department";
    throw new Error(message);
  }
};

export const createAsset = async (payload) => {
  try {
    const response = await api.post("/cs/create-asset", payload);
    if (response.data?.code === "201") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to create asset");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to create asset";
    throw new Error(message);
  }
};

export const editDepartment = async (id, payload) => {
  try {
    const response = await api.put(`/ic/department/${id}`, payload);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      console.log(response.data?.message)
      throw new Error(response.data?.message || "Failed to edit department");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to edit department role";
    throw new Error(message);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/ic/department/${id}`);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to delete department");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to delete department";
    throw new Error(message);
  }
};


export const createLocation = async (payload) => {
  try {
    const response = await api.post("/ic/create-location", payload);
    if (response.data?.code === "201") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to create location");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to create location";
    throw new Error(message);
  }
};

export const editLocation = async (id, payload) => {
  try {
    const response = await api.put(`/ic/location/${id}`, payload);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      console.log(response.data?.message)
      throw new Error(response.data?.message || "Failed to edit location");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to edit location role";
    throw new Error(message);
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await api.delete(`/ic/location/${id}`);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to delete location");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to delete location";
    throw new Error(message);
  }
};

export const approveAsset = async (id) => {
  try {
    const response = await api.post(`/ic/assets/approve/${id}`);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to approve asset");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to approve asset";
    throw new Error(message);
  }
};

export const rejectAsset = async (id) => {
  try {
    const response = await api.post(`/ic/assets/reject/${id}`);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to reject asset");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to reject asset";
    throw new Error(message);
  }
};

export const createCategory = async (payload) => {
  try {
    const response = await api.post("/ic/create-category", payload);
    if (response.data?.code === "201") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to create category");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to create category";
    throw new Error(message);
  }
};

export const editCategory = async (id, payload) => {
  try {
    const response = await api.put(`/ic/category/${id}`, payload);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      console.log(response.data?.message)
      throw new Error(response.data?.message || "Failed to edit category");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to edit category role";
    throw new Error(message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/ic/category/${id}`);
    if (response.data?.code === "200") {
      return response.data?.message;
    } else {
      throw new Error(response.data?.message || "Failed to delete category");
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to delete category";
    throw new Error(message);
  }
};

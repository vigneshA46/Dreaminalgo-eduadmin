import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // 🍪 cookies auto sent
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ===========================
   REFRESH ACCESS TOKEN
=========================== */
const refreshAccessToken = async () => {
  try {
    await api.post('/api/admin/auth/refresh');
    return true;
  } catch (err) {
    return false;
  }
};

/* ===========================
   GENERIC API REQUEST
=========================== */
export const apiRequest = async (
  method,
  endpoint,
  data,
  retry = true // ⛔ retry only once
) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      ...(data !== undefined && { data }),
    });

    return response.data; 
  } catch (error) {
    // 🔐 Access token expired
    if (
      error.response?.status === 401 &&
      retry
    ) {
      const refreshed = await refreshAccessToken();

      if (refreshed) {
        // 🔁 retry original request ONCE
        return apiRequest(method, endpoint, data, false);
      }

      // ❌ refresh failed → logout
      window.location.href = '/auth/login';
      throw new Error('Session expired');
    }

    throw new Error(
      error.response?.data?.message || 'Something went wrong'
    );
  }
};

export default api;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const FALLBACK_BASE_URL = "http://localhost:8000/api/v1";

class NetworkService {
  constructor(authToken) {
    this.authToken = authToken;

    this.axiosInstance = axios.create({
      baseURL: BASE_URL || FALLBACK_BASE_URL,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === "ERR_NETWORK") {
          // handle globally if needed
          console.error("Server unreachable");
        }
        return Promise.reject(error);
      }
    );
  }

  async createStatusPage(data) {
    try {
      const response = await this.axiosInstance.post("/status-page/", data);
      return response.data;
    } catch (err) {
      console.error("Create status page failed:", err);
      throw err;
    }
  }

  async getAllStatusPages(userId) {
    try {
      const response = await this.axiosInstance.get(
        `/status-page/?user_id=${userId}`
      );
      return response.data?.data || [];
    } catch (err) {
      console.error("Fetch status pages failed:", err);
      throw err;
    }
  }

  async getStatusPageById(id) {
    try {
      const response = await this.axiosInstance.get(`/status-page/${id}`);
      return response.data;
    } catch (err) {
      console.error("Fetch status page by ID failed:", err);
      throw err;
    }
  }

  async addLogEntry(statusPageId, payload) {
    try {
      const response = await this.axiosInstance.post(
        `/status-page/${statusPageId}/add_log_entry`,
        payload
      );
      return response.data;
    } catch (err) {
      console.error("Add log entry failed:", err);
      throw err;
    }
  }

  async deleteLogEntry(statusPageId, entryId) {
    try {
      const response = await this.axiosInstance.delete(
        `/status-page/${statusPageId}/log/${entryId}`
      );
      return response.data;
    } catch (err) {
      console.error("Delete log entry failed:", err);
      throw err;
    }
  }

  async deleteStatusPage(pageId, userId) {
    try {
      const response = await this.axiosInstance.delete(
        `/status-page/${pageId}`,
        { params: { user_id: userId } }
      );
      return response.data;
    } catch (err) {
      console.error("Delete status page failed:", err);
      throw err;
    }
  }
}

export default NetworkService;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const FALLBACK_BASE_URL = "http://localhost:8000/api/v1";

class PublicNetworkService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL || FALLBACK_BASE_URL,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === "ERR_NETWORK") {
          console.error("Server unreachable");
        }
        return Promise.reject(error);
      }
    );
  }

  async getStatusPageBySlug(slug) {
    try {
      const response = await this.axiosInstance.get(`/public/${slug}`);
      return response.data;
    } catch (err) {
      console.error("Fetch public status page failed:", err);
      throw err;
    }
  }
}

export default new PublicNetworkService();

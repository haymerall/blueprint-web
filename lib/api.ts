/**
 * Centralized API client for Blueprint AI
 * Connects frontend workspaces to FastAPI backend endpoints and Gemini Vision services.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.blueprintai.com";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const apiClient = {
  async get(endpoint: string, options: RequestOptions = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "GET",
      headers,
    });
    return handleResponse(res);
  },

  async post(endpoint: string, data: any, options: RequestOptions = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async uploadFile(endpoint: string, file: File, options: RequestOptions = {}) {
    const formData = new FormData();
    formData.append("file", file);

    const headers: Record<string, string> = {
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...((options.headers as Record<string, string>) || {}),
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: formData,
    });
    return handleResponse(res);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

export const apiCall = async (endpoint: string, options: RequestOptions = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const token = await AsyncStorage.getItem('user_token');

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export const api = {
  get: (endpoint: string) => apiCall(endpoint, { method: 'GET' }),
  post: (endpoint: string, body?: any) => apiCall(endpoint, { method: 'POST', body }),
  put: (endpoint: string, body?: any) => apiCall(endpoint, { method: 'PUT', body }),
  patch: (endpoint: string, body?: any) => apiCall(endpoint, { method: 'PATCH', body }),
  delete: (endpoint: string) => apiCall(endpoint, { method: 'DELETE' }),
};

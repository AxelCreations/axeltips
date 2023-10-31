import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import https from 'https';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const connection: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000,
  headers: {
    ContentType: 'application/json',
    Accept: '*'
  },
});

connection.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const jwt = Cookies.get('authToken');

  if ( !!jwt ) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  return config;
}, async (error: any) => {
  const router = useRouter();

  if ( error.response?.status === 401 ) {
    router.replace('/auth/login');
  }

  throw error.response;
});

export default connection;

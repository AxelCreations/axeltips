import { googleConnection } from '@/lib/connection';
import { GoogleInfoModelType } from '@/lib/models/GoogleInfoModel';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type GoogleInfoModelResponse = {
  data: GoogleInfoModelType;
}

export const getGoogleInfo = (token: string): Promise<GoogleInfoModelResponse> => {
  googleConnection.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, async (error: any) => {
    throw error.response;
  });

  return googleConnection.get('oauth2/v2/userinfo');
}
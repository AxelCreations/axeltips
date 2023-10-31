import { AxiosResponse } from 'axios';
import { PostModelType } from '@/lib/models/PostModel';
import connection from '@/lib/connection';

type PostsModelResponse = {
  data: PostModelType[];
}

type PostModelResponse = {
  data: PostModelType;
}

export const GetAllPosts = (): Promise<AxiosResponse<PostsModelResponse>> => {
  return connection.get(`posts`);
}

export const AddPost = (data: PostModelType): Promise<AxiosResponse<PostModelResponse>> => {
  return connection.post(`posts`, data);
}

export const UpdatePost = (id: string, data: PostModelType): Promise<AxiosResponse<PostModelResponse>> => {
  return connection.put(`posts/${id}`, data);
}

export const DeletePost = (id: string): Promise<AxiosResponse> => {
  return connection.delete(`posts/${id}`);
}

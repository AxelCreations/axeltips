import { PostModelType } from '@/lib/models/PostModel';
import connection from '@/lib/connection';

type PostsModelResponse = {
  data: PostModelType[];
}

type PostModelResponse = {
  data: PostModelType;
}

export const GetAllPosts = (): Promise<PostsModelResponse> => {
  return connection.get(`posts`);
}

export const AddPost = (data: PostModelType): Promise<PostModelResponse> => {
  return connection.post(`posts`, data);
}

export const UpdatePost = (id: string, data: PostModelType): Promise<PostModelResponse> => {
  return connection.put(`posts/${id}`, data);
}

export const LikePost = (id: string): Promise<{id: string, likeCount: number}> => {
  return connection.put(`posts/${id}/like`);
}

export const DeletePost = (id: string): Promise<string> => {
  return connection.delete(`posts/${id}`);
}

import { AddPost, DeletePost, GetAllPosts, LikePost, UpdatePost } from '@/api/posts';
import { PostModelType } from '@/lib/models/PostModel';
import actionTypes from "@/redux/actionTypes";

type DispatchProps = {
  type: string;
  payload: PostModelType[] | PostModelType;
}

type DispatchFieldProps = {
  type: string;
  payload: number | string | { id: string, likeCount: number };
}

export const getPostsAction = () => async (dispatch: (arg0: DispatchProps) => void) => {
  try {
    const { data } = await GetAllPosts();

    dispatch({ type: actionTypes.FETCH_ALL, payload: data });
  } catch (error) {
    console.error({ error });
  }
}

export const addPostAction = (post: PostModelType) => async (dispatch: (arg0: DispatchProps) => void) => {
  try {
    const { createdAt, updatedAt, ...postData } = post;

    const { data } = await AddPost(postData);

    dispatch({ type: actionTypes.CREATE, payload: data });
  } catch (error) {
    console.error({ error });
  }
}

export const editPostAction = (post: PostModelType) => async (dispatch: (arg0: DispatchProps) => void) => {
  try {
    const { createdAt, updatedAt, ...postData } = post;

    const { data } = await UpdatePost(post._id as string, postData);

    dispatch({ type: actionTypes.UPDATE, payload: data });
  } catch (error) {
    console.error({ error });
  }
}

export const likePost = (id: string) => async (dispatch: (arg0: DispatchFieldProps) => void) => {
  try {
    const { likeCount } = await LikePost(id);

    dispatch({ type: actionTypes.LIKE, payload: { id, likeCount } });
  } catch (error) {
    console.error({ error });
  }
}

export const deletePostAction = (id: string) => async (dispatch: (arg0: DispatchFieldProps) => void) => {
  try {
    const deletedId = await DeletePost(id);

    dispatch({ type: actionTypes.DELETE, payload: deletedId });
  } catch (error) {
    console.error({ error });
  }
}

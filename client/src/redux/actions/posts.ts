import { AddPost, GetAllPosts, UpdatePost } from '@/api/posts';
import { PostModelType } from '@/lib/models/PostModel';
import actionTypes from "@/redux/actionTypes";

type DispatchProps = {
  type: string;
  payload: PostModelType[] | PostModelType;
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
    const { data } = await AddPost(post);

    dispatch({ type: actionTypes.CREATE, payload: data });
  } catch (error) {
    console.error({ error });
  }
}

export const editPostAction = (post: PostModelType) => async (dispatch: (arg0: DispatchProps) => void) => {
  try {
    const { data } = await UpdatePost(post._id as string, post);

    dispatch({ type: actionTypes.UPDATE, payload: data });
  } catch (error) {
    console.error({ error });
  }
}

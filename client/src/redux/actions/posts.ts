import { GetAllPosts } from '@/api/posts';
import { PostModelType } from '@/lib/models/PostModel';

type DispatchProps = {
  type: string;
  payload: PostModelType[] | PostModelType;
}

export const getPostsAction = () => async (dispatch: (arg0: DispatchProps) => void) => {
  try {
    const { data } = await GetAllPosts();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.error({error});
  }
}
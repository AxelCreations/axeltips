import { AddPost, DeletePost, GetAllPosts, UpdatePost } from "@/api/posts";
import { PostModelType } from "@/lib/models/PostModel";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [] as PostModelType[],
}

export const GetPosts = createAsyncThunk('posts/fetchPosts', () => {
  try {
    GetAllPosts().then(({ data: { data } }) => {
      return data;
    });
  } catch (error) {
    console.error(error);
  }

  return null;
});

const PostSlicer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    NewPost: (state, action: PayloadAction<PostModelType>) => {
      try {
        state.loading = true;
        AddPost(action.payload).then(({ data: { data } }) => {
          state.data.push(data);
        });
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }

      return state;
    },
    EditPost: (state, action: PayloadAction<PostModelType>) => {
      try {
        state.loading = true;
        UpdatePost(action.payload.id as string, action.payload).then(({ data: { data } }) => {
          state.data = { ...state.data.filter(post => post.id !== data.id), ...data };
        });
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
      return state;
    },
    RemovePost: (state, action: PayloadAction<PostModelType>) => {
      try {
        state.loading = true;
        DeletePost(action.payload.id as string).then(() => {
          state.data = { ...state.data.filter(post => post.id !== action.payload.id) };
        });
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
      return state;
    },
  },
});

const { actions: PostActions, reducer: PostReducer } = PostSlicer;

export const { NewPost, EditPost, RemovePost } = PostActions;

export default PostReducer;


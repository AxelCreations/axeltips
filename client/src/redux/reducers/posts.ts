import actionTypes from "@/redux/actionTypes";
import { PostModelType } from "@/lib/models/PostModel";
import { createReducer, createAction } from "@reduxjs/toolkit";

const fetchAllAction = createAction<PostModelType[]>(actionTypes.FETCH_ALL);
const actionCreatePost = createAction<PostModelType>(actionTypes.CREATE);
const actionUpdatePost = createAction<PostModelType>(actionTypes.UPDATE);
const actionLikePost = createAction<{ id: string, likeCount: number }>(actionTypes.LIKE);
const actionDeletePost = createAction<string>(actionTypes.DELETE);

const posts = createReducer<PostModelType[]>([], (builder) => {
  builder
    .addCase(fetchAllAction, (state, action) => {
      return action.payload;
    })
    .addCase(actionCreatePost, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(actionUpdatePost, (state, action) => {
      const newState = state.map(currentPost => {
        if (currentPost._id === action.payload._id) {
          // Get the previous creation Date
          action.payload.createdAt = currentPost.createdAt;

          currentPost = action.payload;
        }
        return currentPost;
      });

      return [...newState];
    })
    .addCase(actionLikePost, (state, action) => {
      state.map(currentPost => {
        if (currentPost._id === action.payload.id) {
          currentPost.likeCount++;
        }
        return currentPost;
      });
    })
    .addCase(actionDeletePost, (state, action) => {
      return state.filter(currentPost => currentPost._id !== action.payload);
    })
    .addDefaultCase((state) => {
      return state
    })
});

export default posts;

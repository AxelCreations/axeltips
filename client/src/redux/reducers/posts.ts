import actionTypes from "@/redux/actionTypes";
import { PostModelType } from "@/lib/models/PostModel";
import { createReducer, createAction } from "@reduxjs/toolkit";

const fetchAllAction = createAction<PostModelType[]>(actionTypes.FETCH_ALL);
const createPostAction = createAction<PostModelType>(actionTypes.CREATE);
const updatePostAction = createAction<PostModelType>(actionTypes.UPDATE);

const posts = createReducer<PostModelType[]>([], (builder) => {
  builder
    .addCase(fetchAllAction, (state, action) => {
      return action.payload;
    })
    .addCase(createPostAction, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(updatePostAction, (state, action) => {
      const newState = state.map(currentPost => {
        if (currentPost._id === action.payload._id) {
          currentPost = action.payload;
        }
        return currentPost;
      });

      return [...newState];
    })
    .addDefaultCase((state) => {
      return state
    })
});

export default posts;

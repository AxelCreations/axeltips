import { PostModelType } from "@/lib/models/PostModel";
import { createReducer, createAction } from "@reduxjs/toolkit";

const fetchAll = createAction<PostModelType[]>('FETCH_ALL');

const posts = createReducer<PostModelType[]>([], (builder) => {
  builder
    .addCase(fetchAll, (state, action) => {
      return action.payload;
    })
    .addDefaultCase((state, action) => {
      return state
    })
})

export default posts;
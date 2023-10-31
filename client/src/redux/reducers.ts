import { combineReducers } from '@reduxjs/toolkit';

import PostReducer from './PostSlicer';

const Reducers = combineReducers({
  posts: PostReducer,
});

export default Reducers;

import { combineReducers } from '@reduxjs/toolkit';

import posts from './reducers/posts';

const Reducers = combineReducers({
  posts,
});

export default Reducers;

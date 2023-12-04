import { combineReducers } from '@reduxjs/toolkit';

import posts from './reducers/posts';
import auth from './reducers/auth';

const Reducers = combineReducers({
  posts,
  auth
});

export default Reducers;

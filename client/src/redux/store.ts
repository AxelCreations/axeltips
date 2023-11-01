
import Reducers from '@/redux/reducers';
import { configureStore } from '@reduxjs/toolkit';

const ReduxStore = configureStore({
  reducer: {Reducers}
});

export type RootState = ReturnType<typeof ReduxStore.getState>;

export type AppDispatch = typeof ReduxStore.dispatch;

export default ReduxStore;
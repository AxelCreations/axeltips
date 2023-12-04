import { GoogleInfoModelType } from "@/lib/models/GoogleInfoModel";
import actionTypes from "@/redux/actionTypes";
import { createAction, createReducer } from "@reduxjs/toolkit";

const actionAuth = createAction<GoogleInfoModelType>(actionTypes.AUTH);
const actionLogout = createAction<null>(actionTypes.LOGOUT);

const auth = createReducer<GoogleInfoModelType | null>(null, (builder) => {
  builder
    .addCase(actionAuth, (state, action) => {
      return { ...state, ...action.payload }
    })
    .addCase(actionLogout, () => {
      return null;
    })
    .addDefaultCase((state) => {
      return state
    })
});

export default auth;
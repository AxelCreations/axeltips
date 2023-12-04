import { GoogleInfoModelType } from '@/lib/models/GoogleInfoModel';
import actionTypes from '@/redux/actionTypes';
import { redirect } from 'next/navigation';

type DispatchProps = {
  type: string;
  payload: GoogleInfoModelType | null;
}

export const authAction = (googleProfile: GoogleInfoModelType) => async (dispatch: (arg0: DispatchProps) => void) => {
  try {
    localStorage.setItem('googleAuthProfile', JSON.stringify({ ...googleProfile }));

    dispatch({ type: actionTypes.AUTH, payload: googleProfile });
  } catch (err) {
    console.error({err});
  }
}

export const logoutAction = () => async (dispatch: (arg0: DispatchProps) => void) => {
  try {
    localStorage.removeItem('googleAuthProfile');

    dispatch({ type: actionTypes.LOGOUT, payload: null });
  } catch (err) {
    console.error({err});
  }
}


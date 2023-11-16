import Button from '@/components/buttons/Button';
import InputGroup from '@/components/inputs/InputGroup';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { getGoogleInfo } from '@/api/google';

const LoginForm = () => {
  const [googleError, setGoogleError] = useState<string | boolean>(false);

  const performGoogleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const { access_token } = tokenResponse;
      const { data } = await getGoogleInfo(access_token);

      console.log({tokenResponse, data});
    },
    onError: errorResponse => {
      console.error({ errorResponse });
    }
  });

  return (
    <form className='flex flex-col p-5 gap-3'>
      <div className="flex justify-center text-base-100 text-3xl pt-3">
        <div className="flex justify-center items-center rounded-full bg-primary w-16 h-16">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='currentColor'>
            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
          </svg>
        </div>
      </div>
      {googleError && (
        <div className="errors">
          <label htmlFor="" className="text-sm text-error">{googleError}</label>
        </div>
      )}
      <InputGroup id="email" label="Email">
        <input
          id='email'
          type='email'
          className='input input-md input-bordered w-full'
          placeholder='email@domain.com'
          required />
      </InputGroup>
      <InputGroup id="password" label="Password">
        <input
          id='password'
          type='password'
          className='input input-md input-bordered w-full'
          placeholder='please:pass123'
          required />
      </InputGroup>
      <Button
        className='w-full mt-3 text-lg'
        type="submit"
        disabled={false}>
        LogIn
      </Button>
      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
        <InputGroup id={'google_login_button'}>
          <Button
            className='w-full mt-3 text-lg'
            type="button"
            onClick={() => {
              setGoogleError(false);
              performGoogleLogin();
            }}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512" fill='currentColor'>
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </span>
            <span>Login with Google</span>
          </Button>
        </InputGroup>
      }
    </form>
  )
}

export default LoginForm;

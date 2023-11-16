import { useState } from 'react';
import Button from '@/components/buttons/Button';
import LoginForm from '@/components/forms/LoginForm';
import SignupForm from '@/components/forms/SignupForm';

const AuthForms = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className={`flex flex-col border shadow shadow-black w-full md:w-[450px] pb-2 relative overflow-hidden rounded-xl ${!isLoginForm ? 'border-secondary' : 'border-primary'}`}>
      <div className={`border-b ${isLoginForm ? 'border-primary' : 'border-secondary'}`}>
        <Button
          className={`w-[50%] rounded-none btn-primary ${!isLoginForm ? 'bg-base-100 border-base-100' : ''}`}
          onClick={() => { setIsLoginForm(true) }}>
          LogIn
        </Button>
        <Button
          className={`w-[50%] rounded-none btn-secondary ${isLoginForm ? 'bg-base-100 border-base-100' : ''}`}
          onClick={() => { setIsLoginForm(false) }}>
          SignUp
        </Button>
      </div>
      <div className={`flex flex-col${!isLoginForm ? ' hidden' : ''}`}>
        <LoginForm />
      </div>
      {!isLoginForm && (
        <div className={`flex flex-col`}>
          <SignupForm />
        </div>
      )}
    </div>
  )
}

export default AuthForms;

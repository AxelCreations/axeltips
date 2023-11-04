import Button from '@/components/buttons/Button';
import InputGroup from '@/components/inputs/InputGroup';

const LoginForm = () => {
  return (
    <form className='flex flex-col p-5 gap-3'>
      <div className="flex justify-center text-base-100 text-3xl pt-3">
        <div className="flex justify-center items-center rounded-full bg-primary w-16 h-16">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill='currentColor'>
            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
          </svg>
        </div>
      </div>
      <InputGroup id="email" label="Email">
        <input
          id='email'
          type='email'
          className='input input-md input-bordered w-full'
          placeholder='email@domain.com' />
      </InputGroup>
      <InputGroup id="password" label="Password">
        <input
          id='password'
          type='password'
          className='input input-md input-bordered w-full'
          placeholder='please:pass123' />
      </InputGroup>
      <Button
        className='w-full mt-3 text-lg'
        type="submit"
        disabled={false}>
        LogIn
      </Button>
    </form>
  )
}

export default LoginForm;
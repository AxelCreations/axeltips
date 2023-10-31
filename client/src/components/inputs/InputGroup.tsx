import { ComponentProps } from 'react';

type InputGroupProps = {
  children: React.ReactNode;
  label?: string;
  error?: string;
  id: string;
}

const InputGroup = ({ children, label, error, id }: InputGroupProps) => {
  return (
    <div className='form-control w-full'>
      {Boolean(label?.length) && (
        <label htmlFor={id} className="label font-bold pb-0">
          <span className="label-text">{label}</span>
        </label>
      )}
      {children}
      {Boolean(error?.length) && (
        <label htmlFor={id} className="label p-0 ps-1">
          <span className="label-text text-red-400">{error}</span>
        </label>
      )}
    </div>
  )
}

export default InputGroup;
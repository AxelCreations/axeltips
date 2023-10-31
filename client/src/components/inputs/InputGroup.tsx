import { ComponentProps } from 'react';

type InputGroupProps = {
  children: React.ReactNode;
  id: string;
  label?: string;
  error?: string;
}

const InputGroup = ({ children, label, error, id }: InputGroupProps) => {
  return (
    <div className='form-control w-full'>
      {Boolean(label?.length) && (
        <label htmlFor={id} className="label font-bold pb-0 ps-0">
          <span className="label-text">{label}</span>
        </label>
      )}
      {children}
      {Boolean(error?.length) && (
        <label htmlFor={id} className="label pt-1">
          <span className="label-text text-red-400 text-xs">{error}</span>
        </label>
      )}
    </div>
  )
}

export default InputGroup;
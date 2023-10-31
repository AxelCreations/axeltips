import { ComponentProps } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={`btn btn-primary btn-sm ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button;
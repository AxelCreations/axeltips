'use client'

import { Component } from "react";

type ButtonProps = {
  children: string;
  className?: string;
} & Component<'button'>

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={`btn btn-primary ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button;
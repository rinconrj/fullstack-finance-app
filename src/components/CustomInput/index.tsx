import React, { useRef } from "react";
import { Input, InputProps } from "@material-tailwind/react";

export function CustomInput({ className, ...props }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={className || "w-72 font-sans"}>
      <Input {...props} ref={inputRef} />
    </div>
  );
}

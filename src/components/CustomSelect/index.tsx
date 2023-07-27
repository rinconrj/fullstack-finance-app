import React, { useRef, useState } from "react";
import { Select, Option, SelectProps } from "@material-tailwind/react";

interface CustomSelect extends Omit<SelectProps, "children"> {
  options: string[];
  className?: string;
}

export default function CustomSelect({
  options,
  className,
  ...props
}: CustomSelect) {
  const iselectRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (value?: string): void => {
    console.log(value);
    setSelectedOption(value || "");
  };

  return (
    <div className={className || "w-72 font-sans"}>
      <Select
        {...props}
        value={selectedOption}
        onChange={handleSelectChange}
        ref={iselectRef}
      >
        {options.map((option: string) => (
          <Option key={option} value={option} data-id={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
}

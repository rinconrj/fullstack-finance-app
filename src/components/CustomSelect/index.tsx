import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";

interface CustomSelect {
  title: string
  className?: string
  options: string[]
  label?:string
}

export default function CustomSelect({title, label, className, options}:CustomSelect) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
console.log(className);
  return (
    <div className={className || "w-72"}>
      {label && <label htmlFor={title} className="block text-lg font-medium text-gray-700">
        {title}
      </label>}
      <Select
        id={title}
        name={title}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Select>
    </div>
  );
}
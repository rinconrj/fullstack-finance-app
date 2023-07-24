import { useState } from "react";

interface CustomSelect {
  title: string;
  className?: string;
  options: string[];
  label?: string;
}

export default function CustomSelect({
  title,
  label,
  className,
  options,
}: CustomSelect) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: any): void => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };

  return (
    <div className={className || "w-72"}>
      {label && (
        <label
          htmlFor={title}
          className="block text-lg font-medium text-gray-700"
        >
          {title}
        </label>
      )}
      <select
        id={title}
        name={title}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

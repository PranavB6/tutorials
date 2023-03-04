import React from "react";

import { useFormContext } from "react-hook-form";
import { SelectFieldAttributes } from "../../models/FieldAttributes";

const SelectField: React.FC<SelectFieldAttributes> = ({
  label,
  name,
  options,
}) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select {...register(name)} id={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

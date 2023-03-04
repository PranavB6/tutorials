import React from "react";

import { useFormContext } from "react-hook-form";
import { InputFieldAttributes } from "../../models/FieldAttributes";

const InputField: React.FC<InputFieldAttributes> = ({ label, name, type }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} id={name} type={type} />
    </div>
  );
};

export default InputField;

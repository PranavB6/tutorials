import React from "react";
import { useFormContext } from "react-hook-form";
import { CheckboxFieldAttributes } from "../../models/FieldAttributes";

const CheckboxField: React.FC<CheckboxFieldAttributes> = ({
  label,
  name,
  type,
}) => {
  const { register } = useFormContext();

  return (
    <div>
      <input {...register(name)} type="checkbox" id={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default CheckboxField;

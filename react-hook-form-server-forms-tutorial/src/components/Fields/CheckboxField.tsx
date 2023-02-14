import { useFormContext } from "react-hook-form";
import { CheckboxFieldAttributes } from "../../models/FieldAttributes";

type CheckboxFieldProps = CheckboxFieldAttributes;

const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input {...register(props.name)} id={props.name} type="checkbox" />
      <label htmlFor={props.name} data-required={props.config?.required}>
        {props.label}
      </label>
    </div>
  );
};

export default CheckboxField;

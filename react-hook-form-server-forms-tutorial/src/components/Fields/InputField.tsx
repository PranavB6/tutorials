import { useFormContext } from "react-hook-form";
import { InputFieldAttributes } from "../../models/FieldAttributes";

type InputFieldProps = InputFieldAttributes;

const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ [key: string]: any }>();
  return (
    <div>
      <label
        htmlFor={props.name}
        data-required={props.config?.required ?? false}
      >
        {props.label}
      </label>
      <input
        {...register(props.name)}
        id={props.name}
        type={props.type}
        placeholder={props.config?.placeholder}
      />
      {errors[props.name] && (
        <p className="error-message">{String(errors[props.name].message)}</p>
      )}
    </div>
  );
};

export default InputField;

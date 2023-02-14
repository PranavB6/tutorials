import { useFormContext } from "react-hook-form";
import { TextareaFieldAttributes } from "../../models/FieldAttributes";

type TextareaFieldProps = TextareaFieldAttributes;

const TextareaField: React.FC<TextareaFieldProps> = (props) => {
  const { register } = useFormContext();

  return (
    <div>
      <label
        htmlFor={props.name}
        data-required={props.config?.required ?? false}
      >
        {props.label}
      </label>
      <textarea
        {...register(props.name)}
        id={props.name}
        placeholder={props.config?.placeholder}
      />
    </div>
  );
};

export default TextareaField;

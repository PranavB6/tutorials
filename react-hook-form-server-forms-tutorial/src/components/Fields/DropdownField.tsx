import { useFormContext } from "react-hook-form";
import { DropdownFieldAttributes } from "../../models/FieldAttributes";

type DropdownFieldProps = DropdownFieldAttributes;

const DropdownField: React.FC<DropdownFieldProps> = (props) => {
  const { register } = useFormContext();

  return (
    <div>
      <label
        htmlFor={props.name}
        data-required={Boolean(props.config?.required) ?? false}
      >
        {props.label}
      </label>
      <select {...register(props.name)} id={props.name}>
        <option value="" disabled={props.config?.required}>
          {props.config?.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;

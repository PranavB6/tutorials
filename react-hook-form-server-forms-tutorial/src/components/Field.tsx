import FieldAttributes, { FieldTypes } from "../models/FieldAttributes";
import CheckboxField from "./Fields/CheckboxField";
import DropdownField from "./Fields/DropdownField";
import InputField from "./Fields/InputField";
import TextareaField from "./Fields/TextareaField";

type FieldProps = FieldAttributes;

const Field: React.FC<FieldProps> = (props) => {
  switch (props.type) {
    case FieldTypes.TEXT:
      return <InputField {...props} />;
    case FieldTypes.DROPDOWN:
      return <DropdownField {...props} />;
    case FieldTypes.CHECKBOX:
      return <CheckboxField {...props} />;
    case FieldTypes.TEXTAREA:
      return <TextareaField {...props} />;
    default:
      // props.type is never because it should not be anything else other than the cases above
      // @ts-expect-error
      throw new Error(`Field type not supported: ${props.type}`);
  }
};

export default Field;

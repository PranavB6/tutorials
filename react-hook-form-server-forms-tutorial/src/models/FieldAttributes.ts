enum FieldType {
  TEXT = "text",
  SELECT = "select",
  CHECKBOX = "checkbox",
}

interface BaseFieldAttributes {
  label: string;
  name: string;
  type: FieldType;
}

interface InputFieldAttributes extends BaseFieldAttributes {
  type: FieldType.TEXT;
}

interface CheckboxFieldAttributes extends BaseFieldAttributes {
  type: FieldType.CHECKBOX;
}

// IMPORTANT: By setting the type to FieldType.SELECT, we are telling TypeScript that the 'options' property is required, so now we will get errors when the 'options' property is missing! This is a great thing!
interface SelectFieldAttributes extends BaseFieldAttributes {
  type: FieldType.SELECT;
  options: { label: string; value: string }[];
}

type FieldAttributes =
  | InputFieldAttributes
  | SelectFieldAttributes
  | CheckboxFieldAttributes;

export default FieldAttributes;
export {
  FieldType,
  type InputFieldAttributes,
  type SelectFieldAttributes,
  type CheckboxFieldAttributes,
};

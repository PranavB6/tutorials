enum FieldTypes {
  TEXT = "text",
  DROPDOWN = "dropdown",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
}

interface BaseFieldAttributes {
  name: string;
  type: string;
  label: string;
  config?: {
    required?: boolean;
    placeholder?: string;
  };
}

interface InputFieldAttributes extends BaseFieldAttributes {
  type: FieldTypes.TEXT;
}

interface DropdownFieldAttributes extends BaseFieldAttributes {
  type: FieldTypes.DROPDOWN;
  options: { value: string; label: string }[];
}

interface CheckboxFieldAttributes extends BaseFieldAttributes {
  type: FieldTypes.CHECKBOX;
}

interface TextareaFieldAttributes extends BaseFieldAttributes {
  type: FieldTypes.TEXTAREA;
}

type FieldAttributes =
  | InputFieldAttributes
  | DropdownFieldAttributes
  | TextareaFieldAttributes
  | CheckboxFieldAttributes;

export default FieldAttributes;
export {
  FieldTypes,
  type InputFieldAttributes,
  type TextareaFieldAttributes,
  type DropdownFieldAttributes,
  type CheckboxFieldAttributes,
};

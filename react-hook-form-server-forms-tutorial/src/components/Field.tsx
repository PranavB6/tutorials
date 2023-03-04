import React from "react";
import FieldAttributes, { FieldType } from "../models/FieldAttributes";
import InputField from "./Fields/InputField";
import SelectField from "./Fields/SelectField";
import CheckboxField from "./Fields/CheckboxField";

const Field: React.FC<FieldAttributes> = (props) => {
  switch (props.type) {
    case FieldType.TEXT:
      return <InputField {...props} />;
    case FieldType.SELECT:
      return <SelectField {...props} />;
    case FieldType.CHECKBOX:
      return <CheckboxField {...props} />;
    default:
      throw new Error("Invalid Field Type");
  }
};

export default Field;

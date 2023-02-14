import { ServerForm } from "../api/Api";
import FieldAttributes, { FieldTypes } from "../models/FieldAttributes";
import * as yup from "yup";

export default function parseServerForm(serverForm?: ServerForm): {
  fields: FieldAttributes[];
  defaultValues: any;
  validationSchema: yup.ObjectSchema<any>;
} {
  if (!serverForm) {
    return {
      fields: [],
      defaultValues: {},
      validationSchema: yup.object({}),
    };
  }

  let fields: FieldAttributes[] = serverFormToFields(serverForm);
  let validationSchema = generateValidationSchema(fields);
  let defaultValues = getDefaultValuesFromServerForm(serverForm);

  return {
    fields,
    defaultValues,
    validationSchema,
  };
}

function serverFormToFields(serverForm: ServerForm): FieldAttributes[] {
  return Object.entries(serverForm.fields).map(([name, attributes]) => {
    if (!isValidFieldType(attributes.type)) {
      throw new Error(`Invalid field type: ${attributes.type}`);
    }

    return {
      name,
      type: attributes.type as FieldTypes,
      label: attributes.label,
      options:
        attributes.type === FieldTypes.DROPDOWN
          ? attributes.options ?? []
          : undefined,
      config: {
        required: attributes.validate?.required ?? false,
        placeholder: attributes.config?.placeholder ?? undefined,
      },
    };
  }) as FieldAttributes[];
}

function isValidFieldType(type: string): type is FieldTypes {
  return Object.values<string>(FieldTypes).includes(type);
}

function getDefaultValuesFromServerForm(serverForm: ServerForm): any {
  let defaultValues: any = {};
  Object.entries(serverForm.fields).forEach(([name, attributes]) => {
    defaultValues[name] = attributes.config?.defaultValue ?? "";
  });

  return defaultValues;
}

function generateValidationSchema(fields: FieldAttributes[]) {
  let schema = yup.object({});

  fields.forEach((field) => {
    if (field.config?.required) {
      if (typeof field.config.required === "string") {
        schema = schema.shape({
          [field.name]: yup.string().required(field.config.required),
        });
      } else {
        schema = schema.shape({
          [field.name]: yup.string().required("Required"),
        });
      }
    }
  });

  console.log(schema);

  return schema;
}

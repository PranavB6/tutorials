
# How to dynamically render forms from a schema using React, Typescript and React Hook Form

**The Problem**: We wanted to create simple forms that could be easily modified by team members who are not developers. We also wanted to be able to easily add new forms to our application. We decided to use a YAML schema to define the form fields and their properties. We also wanted to use React Hook Form to handle the form state and validation.

When I was first tasked with this problem, I of course googled it to find a tutorial. However, although there are many tutorials on how to render forms from a schema using React, I could not find any that used Typescript and React Hook Form. After spending (wayyy too much) time experimenting I came up with a good approach. So I decided to write this tutorial to share my learnings and to help others who are in the same situation as I was.

:rocket: **High Level Solution**: Get the schema from the server, loop through all the fields and render a "Field" component which will render a InputField Component or a SelectField Component or a Checkbox Component etc depending on the field "type". Use React Hook Form to handle the form state and validation. Use React Context (via React Hook Form's FormProvider Component) to manage the entire form state.

Created with:

```typescript
const formSchema: FieldAttributes[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: FieldType.TEXT,
  },
  {
    name: "favAnimal",
    label: "What is Your Favourite Pet?",
    type: FieldType.SELECT,
    options: [
      { label: "Dog 🐶", value: "dog" },
      { label: "Cat 😺", value: "cat" },
      { label: "Bird 🐦", value: "bird" },
      { label: "Fish 🐟", value: "fish" },
      { label: "Tasmanian Devil 😈", value: "devil" },
    ],
  },
  {
    name: "agreeToTerms",
    label: "I Agree to all Terms and Conditions",
    type: FieldType.CHECKBOX,
  },
];
```

## Setup Basic Form

If you want to follow along, please have a look at the appendix at the end of this tutorial to see how to setup a basic React Typescript project with TailwindCSS.

1. Create a basic form

    ```typescript
    // src/App.tsx
    import React from 'react';
    import './App.css';

    function App() {
      return (
        <main className="main">
          <h1>Very Important Form</h1>
          <form className="form">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input name="fullName" id="fullName" type="text" />
            </div>
            <div>
              <label htmlFor="favAnimal">What is Your Favourite Pet?</label>
              <select name="favAnimal" id="favAnimal">
                <option value="dog">Dog 🐶</option>
                <option value="cat">Cat 😺</option>
                <option value="bird">Bird 🐦</option>
                <option value="fish">Fish 🐟</option>
                <option value="devil">Tasmanian Devil 😈</option>
              </select>
            </div>
            <div>
              <input type="checkbox" name="agreeToTerms" id="agreeToTerms" />
              <label htmlFor="agreeToTerms">
                I Agree to all Terms and Conditions
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
      );
    }

    export default App;  
    ```

2. Setup React Hook Form to manage form state

    ```typescript
    import React, { useState } from "react";
    import { useForm, FormProvider } from "react-hook-form";
    import "./App.css";

    function App() {
      const methods = useForm();

      const onSubmitHandler = (values: any) => {
        console.log(`Submitted`);
        console.log(values);
      };

      return (
        <main className="main">
          <h1>Very Important Form</h1>

          {/* setup form provider, so that we can use useFormContext in the input field component */}
          <FormProvider {...methods}>
            <form className="form" onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                  {...methods.register("fullName")}
                  id="fullName"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="favAnimal">What is Your Favourite Pet?</label>
                <select {...methods.register("favAnimal")} id="favAnimal">
                  <option value="dog">Dog 🐶</option>
                  <option value="cat">Cat 😺</option>
                  <option value="bird">Bird 🐦</option>
                  <option value="fish">Fish 🐟</option>
                  <option value="devil">Tasmanian Devil 😈</option>
                </select>
              </div>
              <div>
                <input
                  {...methods.register("agreeToTerms")}
                  type="checkbox"
                  id="agreeToTerms"
                />
                <label htmlFor="agreeToTerms">
                  I Agree to all Terms and Conditions
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>

            {/* display the values of the form on the page */}
            <section>
              <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
            </section>
          </FormProvider>
        </main>
      );
    }

    export default App;
    ```

## Create InputField and SelectField Components

1. Extract a text input field into a separate component

    ```typescript
    // src/components/Fields/InputField.tsx
    import React from "react";

    interface InputFieldProps {
      label: string;
      name: string;
      type: string;
    }

    const InputField: React.FC<InputFieldProps> = ({ label, name, type }) => {
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <input name={name} id={name} type={type} />
        </div>
      );
    };

    export default InputField;
    ```

2. use the `useFormContext` hook to manage the form state of our new `InputField` component

    ```typescript
    // src/components/Fields/InputField.tsx
    ++ import { useFormContext } from "react-hook-form";

    ...
    const InputField: React.FC<InputFieldProps> = (...) => {
    ++  const { register } = useFormContext();

      return (
          ...
    ++      <input {...register(name)} id={name} type={type} />
          ...
      );
    };

    ...
    ```

3. Replace the first input in App.tsx with our new InputField component

    ```typescript
    // src/App.tsx
    ++ import InputField from "./Fields/InputField";

    function App() {
      return (
        ...
          <form>
            ...
    ++        <InputField label="Full Name" name="fullName" type="text" />
            ...
          </form>
        ...
      );
    }
    ```

4. Extract a select field into a separate component and manage the form state with `useFormContext`

    ```typescript
    // src/components/SelectField.tsx
    import React from "react";

    import { useFormContext } from "react-hook-form";

    interface SelectFieldProps {
      label: string;
      name: string;
      options: { label: string; value: string }[];
    }

    const SelectField: React.FC<SelectFieldProps> = ({ label, name, options }) => {
      const { register } = useFormContext();

      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <select {...register(name)} id={name}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    };

    export default SelectField;
    ```

5. Replace the select field in App.tsx with our new SelectField component

    ```typescript
    // src/App.tsx
    ++ import SelectField from "./Fields/SelectField";

    function App() {
      return (
        ...
          <form>
            ...
    ++      <SelectField
    ++        label="What is Your Favourite Pet?"
    ++        name="favAnimal"
    ++        options={[
    ++          { label: "Dog 🐶", value: "dog" },
    ++          { label: "Cat 😺", value: "cat" },
    ++          { label: "Bird 🐦", value: "bird" },
    ++          { label: "Fish 🐟", value: "fish" },
    ++          { label: "Tasmanian Devil 😈", value: "devil" },
    ++        ]}
    ++      />
            ...
          </form>
        ...
      );
    }
    ```

## Create FieldAttributes Interface which InputFieldAttributes and SelectFieldAttributes will extend from

1. Even in this small example, we can see that both fields share the `label` and `name` attributes. We can imagine that these two properties (and probably more) will be common among all Fields, so lets extract these attributes into a separate interface and extend it in both the `InputFieldProps` and `SelectFieldProps` interfaces.

    ```typescript

    // --- BEFORE ---

    // src/components/Fields/InputField.tsx
    interface InputFieldProps {
      label: string;
      name: string;
      type: string;
    }

    // src/components/Fields/SelectField.tsx
    interface SelectFieldProps {
      label: string;
      name: string;
      options: { label: string; value: string }[];
    }

    // --- AFTER ---

    // src/models/FieldAttributes.ts
    // (move all the interfaces to this file)

    enum FieldType {
      TEXT = "text",
      SELECT = "select",
    }

    interface BaseFieldAttributes {
      label: string;
      name: string;
      type: FieldType;
    }

    interface InputFieldAttributes extends BaseFieldAttributes {
      type: FieldType.TEXT;
    }

    // IMPORTANT: By setting the type to FieldType.SELECT, we are telling TypeScript that the 'options' property is required, so now we will get errors when the 'options' property is missing! This is a great thing!
    interface SelectFieldAttributes extends BaseFieldAttributes {
      type: FieldType.SELECT;
      options: { label: string; value: string }[];
    }

    type FieldAttributes = InputFieldAttributes | SelectFieldAttributes;

    export default FieldAttributes;
    export { FieldType, type InputFieldAttributes, type SelectFieldAttributes };

    ```

2. Now we can import these interfaces into both the `InputField` and `SelectField` components and use them to type the props.

    ```typescript
    // src/components/Fields/InputField.tsx
    ++ import { InputFieldAttributes } from "../../models/FieldAttributes";

    ++ const InputField: React.FC<InputFieldAttributes> = (...) => {
      ...
    };
    ```

    ```typescript
    // src/components/Fields/SelectField.tsx
    ++ import { SelectFieldAttributes } from "../../models/FieldAttributes";

    ++ const SelectField: React.FC<SelectFieldAttributes> = (...) => {
      ...
    };
    ```

3. If you look back at `App.tsx`, you will see we broke some things so let's fix that.

    ```typescript
    // src/App.tsx
    import { FieldType } from "./models/FieldAttributes";

    function App() {
      return (
        ...
          <form>
            ...
            {/* Add type to both fields */}
            <InputField
              type={FieldType.TEXT}
              ...
            />

            <SelectField
              type={FieldType.SELECT}
              ...
            />
            ...
          </form>
        ...
      );
    }

    ```

## Create CheckboxField Component and use FieldAttributes Interface

1. Now let's practice using our new interfaces by using it to create a `CheckboxField`.

    ```typescript
    // src/models/FieldAttributes.ts
    enum FieldType {
      ...,
      // Add new field to the enum
      CHECKBOX = "checkbox", 
    }

    // create interface for the props of the CheckboxField Component
    interface CheckboxFieldAttributes extends BaseFieldAttributes {
      type: FieldType.CHECKBOX;
    }

    // add the new interface to the union type
    type FieldAttributes = ... | CheckboxFieldAttributes; 
    
    // export the new interface
    export { ..., type CheckboxFieldAttributes };
    ```

2. Now we can create the `CheckboxField` component.

    ```typescript
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
    ```

3. Now we can use the `CheckboxField` component in `App.tsx`.

    ```typescript
    // src/App.tsx
    ++ import CheckboxField from "./components/Fields/CheckboxField";

    function App() {
      return (
        ...
          <form>
            ...
    ++        <CheckboxField
    ++          label="I Agree to all Terms and Conditions"
    ++          name="agreeToTerms"
    ++          type={FieldType.CHECKBOX}
    ++        />
            ...
          </form>
        ...
      );
    }
    ```

## Combine all Fields into a Single Field Component

1. We are almost done. Next lets combine all of the fields into a single `Field` component. This will allow us to pass in the `label`, `name`, and `type` as props and then render the correct field based on the `type` prop.

    ```typescript
    // src/components/Field.tsx
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
    ```

2. Now we can use the `Field` component in `App.tsx`.

    ```typescript
    // src/App.tsx
    ++ import Field from "./components/Field";

    function App() {
      return (
        ...
          <form>
    ++        <Field label="Full Name" name="fullName" type={FieldType.++TEXT} />

    ++        <Field
    ++          label="What is Your Favourite Pet?"
    ++          name="favAnimal"
    ++          type={FieldType.SELECT}
    ++          options={[
    ++            { label: "Dog 🐶", value: "dog" },
    ++            { label: "Cat 😺", value: "cat" },
    ++            { label: "Bird 🐦", value: "bird" },
    ++            { label: "Fish 🐟", value: "fish" },
    ++            { label: "Tasmanian Devil 😈", value: "devil" },
    ++          ]}
    ++        />

    ++        <Field
    ++          label="I Agree to all Terms and Conditions"
    ++          name="agreeToTerms"
    ++          type={FieldType.CHECKBOX}
    ++        />
            
            ...
          </form>
        ...
      );
    }
    ```

## Create a JSON Config for the Form and Dynamicly Render the Form

1. Now we have a single component that can render any field type. This is a lot cleaner than having to render each field type individually. Next let's create a "json config" which we will iterate through to generate the form!

    ```typescript
    // src/App.tsx
    ++ import Field from "./components/Field";
    ++ import FieldAttributes, { FieldType } from "./models/FieldAttributes";

    ++ const formSchema: FieldAttributes[] = [
    ++   {
    ++     name: "fullName",
    ++     label: "Full Name",
    ++     type: FieldType.TEXT,
    ++   },
    ++   {
    ++     name: "favAnimal",
    ++     label: "What is Your Favourite Pet?",
    ++     type: FieldType.SELECT,
    ++     options: [
    ++       { label: "Dog 🐶", value: "dog" },
    ++       { label: "Cat 😺", value: "cat" },
    ++       { label: "Bird 🐦", value: "bird" },
    ++       { label: "Fish 🐟", value: "fish" },
    ++       { label: "Tasmanian Devil 😈", value: "devil" },
    ++     ],
    ++   },
    ++   {
    ++     name: "agreeToTerms",
    ++     label: "I Agree to all Terms and Conditions",
    ++     type: FieldType.CHECKBOX,
    ++   },
    ++ ];

    function App() {
      ...

      return (
        <main className="main">
          ...
            <form ...>
    ++          {formSchema.map((field) => (
    ++            <Field {...field} />
    ++          ))}
             ...
            </form>

          ...
        </main>
      );
    }

    ```

:raising_hand: **What if the form schema from my server is different from the form schema I want to use in my React app?** This is a common problem when working with forms. The solution is to create a mapping between the two schemas. This mapping will tell your React app how to render the form fields from the schema you get from the server. This mapping will also tell your React app how to handle the form state and validation. For simplicity, I will keep the server schema and the React app schema the same.

# Appendix

## Prerequisites

### Setup the project

1. Create a React with Typescript app using create-react-app

    ```bash
    npx create-react-app react-hook-form-server-forms-tutorial --template typescript
    ```

2. Install React Hook Form, Yup (for form validation), and TailwindCSS (for styling) with TailwindCSS Forms and Typography plugins

    ```bash
    cd react-hook-form-server-forms-tutorial
    npm install react-hook-form yup tailwindcss @tailwindcss/forms @tailwindcss/typography
    ```

### Setup TailwindCSS

1. Create a `tailwind.config.js` file in the root of the project

    ```bash
    npx tailwindcss init
    ```

2. Add the following to the `tailwind.config.js` file

    ```diff
    /** @type {import('tailwindcss').Config} */

    module.exports = {
    ++  content: ["./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
    ++  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
    };

    ```

3. Copy this CSS into `index.css`

    ```css
    /* src/index.css */

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer components {
      .main {
        @apply mt-10 mx-auto container w-1/3 prose;
      }

      .form {
        @apply grid grid-cols-1 gap-6;
      }

      .form label {
        @apply text-gray-700;
      }

      .form label[data-required="true"]::after {
        @apply ml-1 text-red-500;
        content: "*";
      }

      .form input[type="text"],
      .form input[type="email"],
      .form input[type="date"],
      .form select,
      .form textarea {
        @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm;

        /* for focus state */
        @apply focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50;
      }

      .form input[type="checkbox"] {
        @apply mr-3 rounded border-gray-300 text-indigo-600 shadow-sm;

        /* for focus state */
        @apply focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50;
      }

      .form button {
        @apply block ml-auto mt-5 bg-indigo-600 text-white px-4 py-2 rounded-md transition;

        /* for focus state */
        @apply focus:outline-none focus:bg-indigo-500 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:scale-105 active:scale-95;
      }

      .form p.error-message {
        @apply mt-2 mb-0 text-red-500;
      }
    }
    ```

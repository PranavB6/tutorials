import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "./App.css";
import Field from "./components/Field";
import FieldAttributes, { FieldType } from "./models/FieldAttributes";

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
          {formSchema.map((field) => (
            <Field {...field} />
          ))}
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

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "./App.css";
import Field from "./components/Field";
import { FieldTypes } from "./models/FieldAttributes";
import UserValues from "./models/UserValues";
import Api, { ServerForm } from "./api/Api";
import parseServerForm from "./util/serverFormToFields";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const [serverForm, setServerForm] = useState<ServerForm>();

  const { fields, defaultValues, validationSchema } =
    parseServerForm(serverForm);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    Api.getForm().then((response) => {
      setServerForm(response);
    });
  }, []);

  useEffect(() => {
    if (serverForm) {
      methods.reset(defaultValues);
    }
  }, [serverForm]);

  const onSubmitHandler = (values: any) => {
    console.log(`Submitted`);
    console.log(values);
  };

  return (
    <main className="main prose">
      <h1>Forms</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)} className="form">
          {fields.map((field) => (
            <Field key={field.name} {...field} />
          ))}
          <button type="submit">Submit</button>
        </form>
        <section>
          <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
        </section>
      </FormProvider>
    </main>
  );
}

export default App;

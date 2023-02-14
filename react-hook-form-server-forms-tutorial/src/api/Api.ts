const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ServerForm {
  version: string;
  fields: {
    [key: string]: {
      type: string;
      label: string;
      options?: { value: string; label: string }[];
      config?: {
        placeholder?: string;
        defaultValue?: string | boolean;
      };
      validate?: {
        required?: boolean | string;
      };
    };
  };
}

const serverForm: ServerForm = {
  version: "1.0",
  fields: {
    firstName: {
      type: "text",
      label: "First Name",
      config: {
        placeholder: "Enter your first name",
      },
      validate: {
        required: true,
      },
    },
    lastName: {
      type: "text",
      label: "Last Name",
      config: {
        placeholder: "Enter your last name",
      },
      validate: {
        required: true,
      },
    },
    category: {
      type: "dropdown",
      label: "Category",
      options: [
        { value: "1", label: "Category 1" },
        { value: "2", label: "Category 2" },
        { value: "3", label: "Category 3" },
      ],
      config: {
        placeholder: "Select a category...",
      },
      validate: {
        required: "Please select a category",
      },
    },
    description: {
      type: "textarea",
      label: "Description",
      config: {
        placeholder: "Enter a description",
        defaultValue: "Default description",
      },
    },
  },
};

class Api {
  static async getForm() {
    await sleep(1000);
    return serverForm;
  }

  static async getFormReject() {
    await sleep(1000);
    return Promise.reject("Error");
  }
}

export default Api;

"use client";
import { FormEvent, Fragment, useState } from "react";
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Button,
} from "@headlessui/react";
import MessageModal from "@/components/MessageModal";
import login from "@/app/actions/login";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const actionResponse = await login(formData);
    console.log(actionResponse);
  }

  return (
    <Fragment>
      <form className="text-black" onSubmit={handleSubmit}>
        <Fieldset className="flex flex-col items-center gap-4">
          <Legend className="text-3xl font-bold">Login</Legend>
          <Field className="flex flex-col gap-2">
            <Label className="text-xl self-center">Email</Label>
            <Input
              type="email"
              name="email"
              className="border-2 rounded p-2"
              required
            />
          </Field>
          <Field className="flex flex-col gap-2">
            <Label className="text-xl self-center">Password</Label>
            <Input
              type="password"
              name="password"
              className="border-2 rounded p-2"
              required
            />
          </Field>
          <Button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Inscription
          </Button>
        </Fieldset>
      </form>
      {error && (
        <MessageModal
          isError={true}
          name={error}
          onClose={() => setError(null)}
        />
      )}
    </Fragment>
  );
}

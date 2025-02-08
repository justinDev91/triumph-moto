"use client";
import signup from "@/app/actions/signup";

import { FormEvent, Fragment, useEffect, useState } from "react";
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Button,
} from "@headlessui/react";
import MessageModal from "@/components/MessageModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";

export default function SignUp() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const sessionData = await getSession();
      if (sessionData !== null) {
        router.push("/dashboard");
      }
    }
    checkSession();
  }, [router]);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const actionResponse = await signup(formData);
    if (actionResponse === 200) {
      setMessage(`Inscription réussie ! Un email vous a été envoyé`);
    } else if (typeof actionResponse === "object" && "name" in actionResponse) {
      setError(actionResponse.name);
    } else {
      setError("An unknown error occurred");
    }
  }

  return (
    <Fragment>
      <form className="text-black" onSubmit={handleSubmit}>
        <Fieldset className="flex flex-col items-center gap-4">
          <Legend className="text-3xl font-bold">Register</Legend>
          <Field className="flex flex-col gap-2">
            <Label className="text-xl self-center">Firstname</Label>
            <Input
              type="text"
              name="firstName"
              className="border-2 rounded p-2"
              required
            />
          </Field>
          <Field className="flex flex-col gap-2">
            <Label className="text-xl self-center">Lastname</Label>
            <Input
              type="text"
              name="lastName"
              className="border-2 rounded p-2"
              required
            />
          </Field>
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
      <div className="mt-4 text-center">
        <Link href="/Sign/In" className="text-blue-500 underline">
          Déjà inscrit ? Connectez-vous ici
        </Link>
      </div>
      {message && (
        <MessageModal
          isError={false}
          name={message}
          onClose={() => setMessage(null)}
        />
      )}
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

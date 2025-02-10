"use client";

import { FormEvent, Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import login, { getSession } from "@/lib/session";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await getSession();
        if (sessionData !== null) {
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    checkSession();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await login(formData);
      const sessionData = await getSession();
      if (sessionData !== null) {
        router.replace("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred. Please try again later.");
    }
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
            Connexion
          </Button>
        </Fieldset>
      </form>
      <div className="mt-4 text-center">
        <Link href="/Sign/Up" className="text-blue-500 underline">
          Pas de compte ? Inscrivez-vous ici
        </Link>
      </div>
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

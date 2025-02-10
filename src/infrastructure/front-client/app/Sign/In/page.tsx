'use client'

import { FormEvent, Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
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
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
          <i className="fas fa-motorcycle text-indigo-600 text-6xl mb-4"></i>
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Login</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Adresse e-mail</label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Mot de passe</label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Pas encore membre ?{' '}
            <Link href="/Sign/Up" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Contactez-nous
            </Link>
          </p>
        </div>
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

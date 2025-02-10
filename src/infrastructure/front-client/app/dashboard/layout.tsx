"use client";

import "@triumph-motorcycles/css";
import { useState, useEffect, useCallback } from "react";
import getUser from "@/hooks/user/getUser";
import Profil from "@/interfaces/user/profil";
import LogoutButton from "@/components/LogoutButton";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  CalendarIcon,
  HomeIcon,
  XMarkIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Appointment",
    href: "/dashboard/appointment",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Location",
    href: "/dashboard/location",
    icon: MoonIcon,
    current: false,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  const [user, setUser] = useState<Profil | null>(null);

  const fetchUserInformation = useCallback(async () => {
    const userInformation = await getUser();
    if (userInformation) {
      setUser(userInformation);
    }
  }, []);

  useEffect(() => {
    fetchUserInformation();
  }, [fetchUserInformation]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
              <i className="fas fa-motorcycle text-indigo-600 text-6xl mb-4"></i>
              <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Login</h2>
            </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className="size-6 shrink-0"
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <LogoutButton />
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              alt="Logo"
              width={16}
              height={16}
              src="/triumph.svg"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="size-6 shrink-0"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <Link
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
                >
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user?.email}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
            <i className="fas fa-motorcycle text-indigo-600 text-6xl mb-4"></i>
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Login</h2>
          </div>
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-white">
          Dashboard
        </div>
        <Link href="#">
          <span className="sr-only">Your profile</span>
        </Link>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

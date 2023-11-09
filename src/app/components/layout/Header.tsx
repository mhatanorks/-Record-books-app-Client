/* eslint-disable @next/next/no-async-client-component */
"use client";
import { signOut } from "next-auth/react";

const Header = async ({ session }: { session: any }) => {
  return (
    <header className="flex justify-between bg-green-900 shadow-xl">
      <h1 className="md:text-3xl tracking-tightest font-thin italic md:mt-3 md:ml-5 text-2xl mt-4 ml-3 text-green-50">
        MYBOOKSRECORDER
      </h1>
      <nav className="flex">
        {session && (
          <>
            <p
              className="md:pt-4 font-bold md:text-xl text-base pt-5 text-green-50 hidden md:block"
              test-data="username"
            >
              Hello! {session?.user.name} !
            </p>
            <button
              className="p-2 m-2 bg-green-50 rounded-lg"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

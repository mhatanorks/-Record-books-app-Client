"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="mt-60 flex justify-center items-center">
      <button
        className="rounded-full text-2xl px-10 py-3 md:text-4xl md:px-20 md:py-6 font-semibold no-underline text-green-50 bg-blue-900 hover:bg-blue-900/80 shadow-2xl transition"
        onClick={() => signIn("google")}
      >
        Please SignIn With Google.
      </button>
    </div>
  );
};

export default Login;

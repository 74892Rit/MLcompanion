"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // eslint-disable-next-line no-undef
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("All fields are required");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) return setError("Invalid email or password!");

    router.push("/");
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-2"
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Sign In
        </button>
      </form>
      <p className="mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [error, setError] = useState("");
  const router = useRouter();

  // eslint-disable-next-line no-undef
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset errors

    if (!name || !email || !password || !role) {
      return setError("All fields are required");
    }

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register");
      }

      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded border p-2"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border p-2"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border p-2"
          required
        />

        {/* Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-4 w-full rounded border p-2"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full rounded bg-green-500 p-2 text-white"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
}

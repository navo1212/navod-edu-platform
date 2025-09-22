"use client";

import { useState } from "react";
import API from "../utils/api";
import { useRouter } from "next/navigation";

export default function LoginRegisterForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        // registration
        const res = await API.post("/auth/register", { email, password, name, role });
        alert("Registration successful! You can now log in.");
        setIsRegister(false);
      } else {
        // login
        const res = await API.post("/auth/login", { email, password });
        const user = res.data.user;
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="border p-6 rounded max-w-md mx-auto">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 ${!isRegister ? "bg-blue-500 text-white rounded" : "bg-gray-200 rounded"}`}
          onClick={() => setIsRegister(false)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${isRegister ? "bg-blue-500 text-white rounded" : "bg-gray-200 rounded"}`}
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isRegister && (
          <>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}

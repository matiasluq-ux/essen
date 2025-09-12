// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus datos.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login Admin</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

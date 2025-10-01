import "../../styles/loginPage/register.css";
import { useState } from "react";
import { supabaseClient } from "../../backend/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await supabaseClient.auth.signUp({
        email,
        password,
      });
      console.log("Usuario registrado exitosamente");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="registerX d-flex space-y-4" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-mail"
        className="border rounded p-2 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded p-2 mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="butonOK text-white py-2 mb-3 rounded">
        Registrarse
      </button>
    </form>
  );
}

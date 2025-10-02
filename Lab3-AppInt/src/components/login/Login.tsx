import "../../styles/loginPage/login.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabaseClient } from "../../backend/supabaseClient";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Inicio de sesión exitoso");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <form className="formX d-flex" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-mail"
        className="border rounded p-2 w-100 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded p-2 w-100 mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <a href="#" className="fs-6 mb-2">
        ¿Has olvidado tu contraseña?
      </a>
      {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
      <button type="submit" className="butonOK text-white py-2 rounded">
        Iniciar sesión
      </button>
    </form>
  );
}

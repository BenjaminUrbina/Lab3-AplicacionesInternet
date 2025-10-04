import "../../styles/loginPage/register.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabaseClient } from "../../backend/supabaseClient";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/TaskPage" replace />;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      console.log("Usuario registrado exitosamente");
      // Redirigir al dashboard después del registro
      navigate("/TaskPage");
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Error al registrar usuario");
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
      <button type="submit" className="butonOK text-white py-2 mb-3 rounded">
        Registrarse
      </button>
    </form>
  );
}

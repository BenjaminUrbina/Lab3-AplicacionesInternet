import { useAuth } from "../../context/AuthContext";
import { supabaseClient } from "../../backend/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate("/PageAuthenticate/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

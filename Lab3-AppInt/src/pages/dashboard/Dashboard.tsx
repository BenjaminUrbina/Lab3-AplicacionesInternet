import { useAuth } from "../../context/AuthContext";
import { supabaseClient } from "../../backend/supabaseClient";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../../context/TaskContext";
import { useContext, useEffect } from "react";
import { useTask } from "../../context/TaskContext";

export default function Dashboard() {
  const { tareas, getDatos } = useTask();
  const { user } = useAuth();
  const navigate = useNavigate();
  const obj = useContext(TaskContext);
  console.log(obj);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate("/PageAuthenticate/login");
  };
  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.email}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

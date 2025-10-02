import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Mientras carga, puedes mostrar un spinner o nada
  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/PageAuthenticate/login" replace />;
  }

  // Si hay usuario, muestra el contenido protegido
  return <>{children}</>;
};

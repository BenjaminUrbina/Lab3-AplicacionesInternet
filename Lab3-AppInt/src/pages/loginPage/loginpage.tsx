import { NavLink, Outlet } from "react-router-dom";
import "../../styles/loginPage/loginpage.css";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Tabs */}
        <div className="auth-tabs">
          <NavLink
            to="register"
            className={({ isActive }) => `auth-tab ${isActive ? "active" : ""}`}
          >
            Regístrate
          </NavLink>
          <NavLink
            to="login"
            className={({ isActive }) => `auth-tab ${isActive ? "active" : ""}`}
          >
            Inicia sesión
          </NavLink>
        </div>

        {/* Aquí se inyecta el form de login o registro */}
        <Outlet />

        {/* Acceso rápido con redes */}
        <div className="auth-social">
          <p className="auth-social-text">Acceso rápido con</p>
          <div className="auth-social-buttons">
            <button className="auth-social-btn">FB</button>
            <button className="auth-social-btn">G</button>
            <button className="auth-social-btn">TW</button>
            <button className="auth-social-btn"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

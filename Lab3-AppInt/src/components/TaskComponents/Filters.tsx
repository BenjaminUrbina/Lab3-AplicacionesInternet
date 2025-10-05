import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/taskPage/Filters.css";
import { supabaseClient } from "../../backend/supabaseClient";

type Props = {
  activePriority: string | null;
  setActivePriority: (v: string | null) => void;
  activeStatus: string | null;
  setActiveStatus: (v: string | null) => void;
};

const Filters: React.FC<Props> = ({
  activePriority,
  setActivePriority,
  activeStatus,
  setActiveStatus,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate("/PageAuthenticate/login");
  };
  const changePassword = async () => {
    const newPassword = prompt("Introduce tu nuevo password:");
    if (newPassword && newPassword.length >= 6) {
      const { error } = await supabaseClient.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        alert("Error al cambiar la contraseña: " + error.message);
      } else {
        alert("Contraseña cambiada exitosamente.");
      }
    } else if (newPassword !== null) {
      alert("La contraseña debe tener al menos 6 caracteres.");
    }
  };
  return (
    <aside className="tp-sidebar">
      <div className="col">
        <h2 className="tp-sidebar-title">Filtros</h2>

        <div className="tp-filters">
          <span className="tp-filters-title">Prioridad</span>
          <button
            className={`tp-filter tp-high ${
              activePriority === "alta" ? "active" : ""
            }`}
            onClick={() => setActivePriority("alta")}
          >
            Alta prioridad
          </button>
          <button
            className={`tp-filter tp-medium ${
              activePriority === "media" ? "active" : ""
            }`}
            onClick={() => setActivePriority("media")}
          >
            Media prioridad
          </button>
          <button
            className={`tp-filter tp-low ${
              activePriority === "baja" ? "active" : ""
            }`}
            onClick={() => setActivePriority("baja")}
          >
            Baja prioridad
          </button>
        </div>

        <div className="tp-filters">
          <span className="tp-filters-title">Estado</span>
          <button
            className={`tp-filter tp-done ${
              activeStatus === "hechas" ? "active" : ""
            }`}
            onClick={() => setActiveStatus("hechas")}
          >
            Tareas Hechas
          </button>
          <button
            className={`tp-filter tp-progress ${
              activeStatus === "curso" ? "active" : ""
            }`}
            onClick={() => setActiveStatus("curso")}
          >
            En curso
          </button>
          <button
            className={`tp-filter tp-pending ${
              activeStatus === "pendientes" ? "active" : ""
            }`}
            onClick={() => setActiveStatus("pendientes")}
          >
            No empezadas
          </button>
        </div>

        <div className="tp-filter-actions">
          <button
            className="tp-btn-reset"
            onClick={() => {
              setActivePriority(null);
              setActiveStatus(null);
            }}
          >
            Restablecer filtros
          </button>
        </div>
      </div>
      <div className="colConf col">
        <h4 className="userconf text-center overflow-hidden">
          Configuración Usuario
        </h4>
        <div className="row">
          <div className="butonOK mt-2 mb-1" onClick={handleLogout}>
            Cerrar sesión
          </div>
        </div>
        <div className="row">
          <div className="butonOK mt-2" onClick={changePassword}>
            Cambiar contraseña
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;

import React from "react";
import "../../styles/taskPage/Filters.css";

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
  return (
    <aside className="tp-sidebar">
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
    </aside>
  );
};

export default Filters;

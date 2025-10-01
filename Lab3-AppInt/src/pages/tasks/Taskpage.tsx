import { useState } from "react";
import Modal from "../../components/modal/Modal";
import TaskForm from "../../components/taskform/Taskform";
import "../../styles/taskPage/Taskpage.css";

export default function TaskPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [activePriority, setActivePriority] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const handleSave = () => {
    alert("Tarea creada 🚀");
    setIsOpen(false);
  };

  return (
    <div className="taskpage">
      {/* Columna izquierda: filtros */}
      <aside className="tp-sidebar">
        <h2 className="tp-sidebar-title">Filtros</h2>

        <div className="tp-filters">
          <span className="tp-filters-title">Prioridad</span>
          <button
            className={`tp-filter tp-high ${activePriority === "alta" ? "active" : ""}`}
            onClick={() => setActivePriority("alta")}
          >
            Alta prioridad
          </button>
          <button
            className={`tp-filter tp-medium ${activePriority === "media" ? "active" : ""}`}
            onClick={() => setActivePriority("media")}
          >
            Media prioridad
          </button>
          <button
            className={`tp-filter tp-low ${activePriority === "baja" ? "active" : ""}`}
            onClick={() => setActivePriority("baja")}
          >
            Baja prioridad
          </button>
        </div>

        <div className="tp-filters">
          <span className="tp-filters-title">Estado</span>
          <button
            className={`tp-filter tp-done ${activeStatus === "hechas" ? "active" : ""}`}
            onClick={() => setActiveStatus("hechas")}
          >
            Tareas Hechas
          </button>
          <button
            className={`tp-filter tp-progress ${activeStatus === "curso" ? "active" : ""}`}
            onClick={() => setActiveStatus("curso")}
          >
            En curso
          </button>
          <button
            className={`tp-filter tp-pending ${activeStatus === "pendientes" ? "active" : ""}`}
            onClick={() => setActiveStatus("pendientes")}
          >
            No empezadas
          </button>
        </div>

        <div className="tp-filter-actions">
          <button className="tp-btn-apply">Aplicar filtros</button>
          <button className="tp-btn-reset" onClick={() => { 
            setActivePriority(null); 
            setActiveStatus(null); 
          }}>
            Restablecer filtros
          </button>
        </div>
      </aside>

      {/* Columna central: lista de tareas */}
      <aside className="tp-tasklist">
        <button className="tp-add-btn" onClick={() => setIsOpen(true)}>
          + Nueva Tarea
        </button>

        <div className="tp-tasks">
          <p className="tp-muted">Aquí irá la lista de tareas…</p>
        </div>
      </aside>

      {/* Columna derecha: detalle de tarea */}
      <main className="tp-main">
        <div className="tp-main-empty">
          <h3>Selecciona una tarea</h3>
          <p className="tp-muted">Aquí se mostrará el contenido.</p>
        </div>
      </main>

      {/* Modal para crear tarea */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Crear Tarea">
        <TaskForm onSubmit={handleSave} />
      </Modal>
    </div>
  );
}

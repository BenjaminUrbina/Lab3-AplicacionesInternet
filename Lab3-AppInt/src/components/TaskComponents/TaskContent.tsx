import React from "react";
import "../../styles/taskPage/TaskContent.css";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  state: string;
  datelimit: string;
};

type Props = {
  task: Task | null;
  onDelete?: () => void;
  onEdit?: () => void;
};

const TaskContent: React.FC<Props> = ({ task, onDelete, onEdit }) => {
  if (!task) {
    return (
      <main className="tp-main">
        <div className="tp-main-empty">
          <h3>Selecciona una tarea</h3>
          <p className="tp-muted">Aquí se mostrará el contenido.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="tp-main">
      <article className="tp-detail">
        {/* Título */}
        <div className="container-fluid">
          <h2 className="tp-detail-title">{task.title}</h2>
        </div>

        {/* Descripción */}
        <div className="tp-desc-box">
          <p>{task.description}</p>
        </div>

        {/* Estado | Prioridad | Fecha */}
        <div className="tp-meta-grid">
          {/* Estado */}
          <div className="tp-meta-block">
            <div className="tp-field-label">Estado</div>
            <div className="tp-segment">
              <button
                className={`tp-pill tp-pill-state tp-pending ${
                  task.state === "pendientes" ? "is-active" : ""
                }`}
                type="button"
                disabled
              >
                No empezadas
              </button>
              <button
                className={`tp-pill tp-pill-state tp-progress ${
                  task.state === "curso" ? "is-active" : ""
                }`}
                type="button"
                disabled
              >
                En curso
              </button>
              <button
                className={`tp-pill tp-pill-state tp-done ${
                  task.state === "hechas" ? "is-active" : ""
                }`}
                type="button"
                disabled
              >
                Hechas
              </button>
            </div>
          </div>

          {/* Prioridad */}
          <div className="tp-meta-block">
            <div className="tp-field-label">Prioridad</div>
            <div className="tp-segment">
              <button
                className={`tp-pill tp-pill-priority tp-high ${
                  task.priority === "alta" ? "is-active" : ""
                }`}
                type="button"
                disabled
              >
                Alta
              </button>
              <button
                className={`tp-pill tp-pill-priority tp-medium ${
                  task.priority === "media" ? "is-active" : ""
                }`}
                type="button"
                disabled
              >
                Media
              </button>
              <button
                className={`tp-pill tp-pill-priority tp-low ${
                  task.priority === "baja" ? "is-active" : ""
                }`}
                type="button"
                disabled
              >
                Baja
              </button>
            </div>
          </div>

          {/* Fecha límite */}
          <div className="tp-meta-block">
            <div className="tp-field-label">Fecha límite</div>
            <div className="tp-date-card">{task.datelimit}</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="tp-actions">
          <div className="tp-actions-inner">
            <button
              className="tp-btn tp-btn-delete"
              type="button"
              onClick={onDelete}
              disabled={!onDelete}
            >
              Eliminar
            </button>
            <button
              className="tp-btn tp-btn-edit"
              type="button"
              onClick={onEdit}
            >
              Editar
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default TaskContent;

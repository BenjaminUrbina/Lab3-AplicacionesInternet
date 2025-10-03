import { useState } from "react";
import Modal from "../../components/modal/Modal";
import TaskForm from "../../components/taskform/Taskform";
import "../../styles/taskPage/Taskpage.css";

type Task = {
  id: number;
  title: string;
  priority: string;
  state: string;
};

export default function TaskPage() {
  //Modal
  const [isOpen, setIsOpen] = useState(false);

  //Filtros
  const [activePriority, setActivePriority] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  //Variable para identificar la tarea selecionada
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  //SIMULACION DE TAREAS DESDE SUPABASE(POR MIENTRAS)
  const [tasks] = useState<Task[]>([
    { id: 1, title: "Preparar informe semanal", priority: "alta", state: "pendientes" },
    { id: 2, title: "Revisar diseño UI", priority: "baja", state: "curso" },
    { id: 3, title: "Actualizar documentación", priority: "alta", state: "hechas" },
    { id: 4, title: "Reunión con el equipo", priority: "alta", state: "hechas" },
    { id: 5, title: "Corregir bugs críticos", priority: "media", state: "hechas" },
    { id: 6, title: "Planificación sprint próximo", priority: "media", state: "curso" },
    { id: 7, title: "Revisar PR de frontend", priority: "media", state: "pendientes" },
    { id: 8, title: "Optimizar queries SQL", priority: "media", state: "curso" },
    { id: 9, title: "Pruebas de integración", priority: "baja", state: "pendientes" },
    { id: 10, title: "Demo para cliente", priority: "baja", state: "curso" },
    { id: 11, title: "Diseñar dashboard", priority: "alta", state: "curso" },
    { id: 12, title: "Configurar CI/CD", priority: "alta", state: "pendientes" },
    { id: 13, title: "Subir a radiant", priority: "alta", state: "hechas" },
    { id: 14, title: "Perder todas las rankeds", priority: "baja", state: "hechas"},
    { id: 15, title: "Borrarlo a la...", priority: "alta", state: "pendientes"},
    { id: 16, title: "Pilas Pilas", priority: "alta", state: "pendientes"},
  ]);

  //FUNCION PARA FILTRAR
  const filteredTasks = tasks.filter((task) => {
    let pass = true;

    // Si hay un filtro de prioridad activo, lo aplicamos
    if (activePriority && task.priority !== activePriority) {
      pass = false;
    }

    // Si hay un filtro de estado activo, lo aplicamos
    if (activeStatus && task.state !== activeStatus) {
      pass = false;
    }
    return pass;
  });

  const handleSave = () => {
    alert("Tarea creada");
    setIsOpen(false);
  };

  return (
    <div className="taskpage">
      {/*-----------------------COLUMNA IZQUIERDA-----------------------*/}
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
          {/*Desactivar Filtros*/}
          <button className="tp-btn-reset" onClick={() => { 
            setActivePriority(null); 
            setActiveStatus(null); 
          }}>
            Restablecer filtros
          </button>
        </div>
      </aside>

      {/*-----------------------COLUMNA CENTRAL(LISTA TAREAS)-----------------------*/}
      <aside className="tp-tasklist">
        <button className="tp-add-btn" onClick={() => setIsOpen(true)}>
          + Nueva Tarea
        </button>
        
          {/* LISTA DE TAREAS*/}
          <div className="tp-tasks">
            {filteredTasks.map((task) => (
            <div
                  key={task.id}
                  className={`tp-task-item 
                    ${selectedTaskId === task.id ? "active" : ""} 
                    tp-${task.state}`}
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  {task.title}
                </div>
            ))}
          </div>
      </aside>

      {/*-----------------------COLUMNA DERECHA-----------------------*/}
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

import { useMemo, useState } from "react";
import Modal from "../../components/TaskComponents/Modal";
import TaskForm from "../../components/TaskComponents/Taskform";
import Filters from "../../components/TaskComponents/Filters";
import TaskList from "../../components/TaskComponents/TaskList";
import TaskContent from "../../components/TaskComponents/TaskContent";
import "../../styles/taskPage/Taskpage.css";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  state: string;
  datelimit: string;
};

export default function TaskPage() {
  // Modal
  const [isOpen, setIsOpen] = useState(false);

  // Filtros
  const [activePriority, setActivePriority] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  // Tarea seleccionada
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  // Datos simulados 
  const [tasks] = useState<Task[]>([
    { id: 1, title: "Preparar informe semanal", description: "Hola Muy buenas", priority: "alta", state: "pendientes", datelimit: "25/10/2025" },
    { id: 2, title: "Revisar diseño UI", description: "Hola Muy chao", priority: "baja", state: "curso", datelimit: "25/10/2025" },
    { id: 3, title: "Actualizar documentación", description: "Hola Muy buenas", priority: "alta", state: "hechas", datelimit: "02/10/2025" },
    { id: 4, title: "Reunión con el equipo", description: "Hola Muy lol", priority: "alta", state: "hechas", datelimit: "12/10/2025" },
    { id: 5, title: "Corregir bugs críticos", description: "Hola Muy buenas", priority: "media", state: "hechas", datelimit: "25/10/2025" },
    { id: 6, title: "Planificación sprint próximo", description: "Hola Muy xxd", priority: "media", state: "curso", datelimit: "25/10/2025" },
    { id: 7, title: "Revisar PR de frontend", description: "Hola Muy buenas", priority: "media", state: "pendientes", datelimit: "23/10/2025" },
    { id: 8, title: "Optimizar queries SQL", description: "Hola Muy listochao", priority: "media", state: "curso", datelimit: "23/10/2025" },
    { id: 9, title: "Pruebas de integración", description: "Hola Muy buenas", priority: "baja", state: "pendientes", datelimit: "12/10/2025" },
    { id: 10, title: "Demo para cliente", description: "Hola Muy hola", priority: "baja", state: "curso", datelimit: "11/10/2025" },
    { id: 11, title: "Diseñar dashboard", description: "Hola Muy buenas", priority: "alta", state: "curso", datelimit: "11/10/2025" },
    { id: 12, title: "Configurar CI/CD", description: "Hola Muy chaoooooo", priority: "alta", state: "pendientes", datelimit: "25/10/2025" },
    { id: 13, title: "Subir a radiant", description: "Hola Muy buenas", priority: "alta", state: "hechas", datelimit: "03/10/2025" },
    { id: 14, title: "Perder todas las rankeds", description: "Hola Muy zapatitoroto", priority: "baja", state: "hechas", datelimit: "01/10/2025" },
    { id: 15, title: "Borrarlo a la...", description: "Hola Muy buenas", priority: "alta", state: "pendientes", datelimit: "02/11/2025" },
    { id: 16, title: "Pilas Pilas", description: "Hola Muy buenas", priority: "alta", state: "pendientes", datelimit: "22/10/2025" },
  ]);

  // Filtrado simple
  const filteredTasks = tasks.filter((t) => {
    if (activePriority && t.priority !== activePriority) return false;
    if (activeStatus && t.state !== activeStatus) return false;
    return true;
  });

  // Tarea seleccionada
  const selectedTask = useMemo(
    () => tasks.find((t) => t.id === selectedTaskId) ?? null,
    [tasks, selectedTaskId]
  );

  const handleSave = () => {
    alert("Tarea creada");
    setIsOpen(false);
  };

  return (
    <div className="taskpage">
      <Filters
        activePriority={activePriority}
        setActivePriority={setActivePriority}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />

      <TaskList
        tasks={filteredTasks}
        selectedTaskId={selectedTaskId}
        onSelect={setSelectedTaskId}
        onOpenNew={() => setIsOpen(true)}
      />

      <TaskContent task={selectedTask} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Crear Tarea">
        <TaskForm onSubmit={handleSave} />
      </Modal>
    </div>
  );
}

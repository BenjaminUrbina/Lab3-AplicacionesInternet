import { useEffect, useMemo, useState } from "react";
import Modal from "../../components/TaskComponents/Modal";
import TaskForm from "../../components/TaskComponents/Taskform";
import Filters from "../../components/TaskComponents/Filters";
import TaskList from "../../components/TaskComponents/TaskList";
import TaskContent from "../../components/TaskComponents/TaskContent";
import "../../styles/taskPage/Taskpage.css";
import { useTask} from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import type { Tarea } from "../../context/TaskContext";

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
  
  //Eliminacion tarea
  const { deleteTask } = useTask();    

  //EditarTarea
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Tarea | null>(null); 

  //Autenticacion y extraer tareas
  const { tareas, refresh } = useTask();
  const { user, loading } = useAuth();

  //Cargar o limpiar tareas una vez que se reviso la sesion
  useEffect(() => {
    if (!loading && user) {
      console.log("Usuario listo, cargando tareas");
      refresh();
    } else if (!loading && !user) {
      console.log("No hay usuario, limpiando tareas");
    }
  }, [loading, user, refresh]);

  //Funcion para detectar tarea selecionada
  const handleOpenEdit = () => {
    if (!selectedTaskId) return;
    const original = tareas.find((t) => t.id === selectedTaskId) ?? null;
    if (!original) return;
    setIsEditing(true);
    setEditingTask(original);  
    setIsOpen(true);
  };

  //Task para usar nombres consistentes y casos vacios
  const uiTasks: Task[] = useMemo(() => {
    return (tareas ?? []).map((t: Tarea) => ({
      id: t.id,                            
      title: t.titulo ?? "Sin título",      
      description: t.descripcion ?? "",      
      priority: t.prioridad ?? "media",      
      state: t.estado ?? "pendiente",        
      datelimit: t.date ?? "Sin fecha",      
    }));
  }, [tareas]);

  //Funcion eliminar
  const handleDelete = async () => {
    
    if (!selectedTaskId) return; 

    try {
      await deleteTask(selectedTaskId);   // elimnar en bd y local
      setSelectedTaskId(null);            // limpiar vista
    } catch (error: any) {
      console.error("Error al eliminar tarea:", error);
      alert(error.message || "Error al eliminar tarea");
    }
  };


  // Filtrado simple
  const filteredTasks = uiTasks.filter((t) => {
    if (activePriority && t.priority !== activePriority) return false;
    if (activeStatus && t.state !== activeStatus) return false;
    return true;
  });

  // Tarea seleccionada
  const selectedTask = useMemo(
    () => uiTasks.find((t) => t.id === selectedTaskId) ?? null,
    [uiTasks, selectedTaskId]
  );


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
        onOpenNew={() => {
          setIsEditing(false);
          setEditingTask(null);
          setIsOpen(true);
        }}
      />

      <TaskContent task={selectedTask} onDelete={handleDelete} onEdit={handleOpenEdit} />  

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isEditing ? "Editar Tarea" : "Crear Tarea"}
      >
        <TaskForm
          mode={isEditing ? "edit" : "create"}
          initial={editingTask ?? undefined}
          onSubmit={() => setIsOpen(false)}
        />
      </Modal>

    </div>
  );
}

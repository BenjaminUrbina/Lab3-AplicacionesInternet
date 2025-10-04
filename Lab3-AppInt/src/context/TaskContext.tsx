import { createContext, useContext, useState } from "react";
import { supabaseClient } from "../backend/supabaseClient";
import { useAuth } from "./AuthContext";

//Tareas
export type Tarea = {
  id: number;   
  titulo: string;
  descripcion: string | null;
  estado: string;
  prioridad: string;
  date: string | null;   
  userid: string;        
};

//Parametros para una nueva Tarea
export type NewTaskInput = {
  titulo: string;
  descripcion?: string | null;
  estado: string;       
  prioridad: string;    
  date: string | null;  
};

//Parametros para actualizar Tarea
export type UpdateTaskInput = {
  id: number;                       
  titulo?: string;
  descripcion?: string | null;
  estado?: "pendientes" | "curso" | "hechas";
  prioridad?: "alta" | "media" | "baja";
  date?: string | null;             
};

//Funciones y datos que se pueden utilizar desde otros context
interface TaskContextType {
  tareas: Tarea[];
  refresh: () => Promise<void>;
  createTask: (input: NewTaskInput) => Promise<Tarea>; //Creacion de tarea
  deleteTask: (id: number) => Promise<void>; //eliminacion de tarea
  updateTask: (input: UpdateTaskInput) => Promise<Tarea>;//Actualizar tarea

}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask debe ser usado dentro de TaskContextProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  
  //Tarea y usuario
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const { user } = useAuth();

  //Extraer todas las tareas del usuario(Desde bd)
  const refresh = async () => {
    if (!user) { setTareas([]); return; }
    const { data, error } = await supabaseClient
      .from("tareas")
      .select("id, titulo, descripcion, estado, prioridad, date, userid")
      .eq("userid", user.id)
    if (error) { console.error(error); setTareas([]); return; }
    setTareas((data ?? []).map((t: any) => ({ ...t, id: Number(t.id) })));
  };

  //Funcion para crear tarea
  const createTask = async (input: NewTaskInput): Promise<Tarea> => {
    if (!user) throw new Error("No autenticado");
    const payload = { ...input, userid: user.id };
    const { data, error } = await supabaseClient
      .from("tareas")
      .insert([payload])
      .select("id, titulo, descripcion, estado, prioridad, date, userid")
      //Devolver fila para actualizar array local
      .single();
    if (error) throw error;
    const created: Tarea = { ...(data as any), id: Number((data as any).id) };
    setTareas(prev => [created, ...prev]);
    return created;
  };

  const deleteTask = async (id: number) => {
  // Quitamos de la ui antes eliminar en bd
  const prev = tareas;
  setTareas(prev.filter(t => t.id !== id));

  const { error } = await supabaseClient
    .from("tareas")
    .delete()
    .eq("id", id);

  if (error) {
    // regresamos el estado anterior de la ui
    setTareas(prev);
    throw error;
  }
  };


  const updateTask = async (input: UpdateTaskInput): Promise<Tarea> => {
    const { id, ...maybePatch } = input;
    // Construye el "patch" solo con campos definidos (evita sobreescribir con undefined)
    const patch: Partial<Tarea> = {};
    if (typeof maybePatch.titulo !== "undefined") patch.titulo = maybePatch.titulo;
    if (typeof maybePatch.descripcion !== "undefined") patch.descripcion = maybePatch.descripcion;
    if (typeof maybePatch.estado !== "undefined") patch.estado = maybePatch.estado;
    if (typeof maybePatch.prioridad !== "undefined") patch.prioridad = maybePatch.prioridad;
    if (typeof maybePatch.date !== "undefined") patch.date = maybePatch.date;

    const { data, error } = await supabaseClient
      .from("tareas")
      .update(patch)
      .eq("id", id)
      .select("id, titulo, descripcion, estado, prioridad, date, userid")
      .single();

    if (error) throw error;

    const updated: Tarea = { ...(data as any), id: Number((data as any).id) };

    // Actualiza el estado local reemplazando la tarea en especifico
    setTareas(prev => prev.map(t => (t.id === id ? updated : t)));

    return updated;
  };

  return (
    <TaskContext.Provider value={{ tareas, refresh,createTask,deleteTask,updateTask}}>
      {children}
    </TaskContext.Provider>
  );
};

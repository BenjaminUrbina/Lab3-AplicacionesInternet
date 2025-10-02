import { createContext, useContext, useState } from "react";
import { supabaseClient } from "../backend/supabaseClient";

interface TaskContextType {
  tareas: any; // Puedes cambiar 'any' por el tipo correcto de tus tareas
  getDatos: () => Promise<any>;
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

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tareas, setTareas] = useState();

  const getDatos = async () => {
    const user = await supabaseClient.auth.getUser();
    const respuesta = await supabaseClient
      .from("tareas")
      .select()
      .eq("user_id", user.data.user?.id); /* El  */
    console.log(respuesta);
    return respuesta;
  };

  return (
    <TaskContext.Provider value={{ tareas, getDatos }}>
      {children}
    </TaskContext.Provider>
  );
};

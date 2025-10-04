import { useState , useEffect} from "react";
import "../../styles/taskPage/Taskform.css";
import { useTask } from "../../context/TaskContext";
import type { Tarea } from "../../context/TaskContext";

type TaskFormProps = {
  mode?: "create" | "edit"; //Cuando queramos crear la tarea o cuando la queramos editar
  initial?: Partial<Tarea>;// para editar
  onSubmit?: () => void;
};
export default function TaskForm({ mode = "create", initial, onSubmit }: TaskFormProps) {

  const { createTask, updateTask } = useTask();

  //Crear estados segun los valores de origen
  const [titulo, setTitulo] = useState(initial?.titulo ?? "");
  const [descripcion, setDescripcion] = useState(initial?.descripcion ?? "");
  const [estado, setEstado] = useState<"pendientes" | "curso" | "hechas">((initial?.estado as any) ?? "pendientes");
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">((initial?.prioridad as any) ?? "media");
  const [date, setDate] = useState<string>(initial?.date ?? ""); 
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Actualizar los props en casos de seleccionar otra tarea
  useEffect(() => {
    setTitulo(initial?.titulo ?? "");
    setDescripcion(initial?.descripcion ?? "");
    setEstado((initial?.estado as any) ?? "pendientes");
    setPrioridad((initial?.prioridad as any) ?? "media");
    setDate(initial?.date ?? "");
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!titulo.trim()) {
      setErrorMsg("El título es obligatorio");
      return;
    }

    try {
      setSubmitting(true);

      if (mode === "edit" && initial?.id != null) {
        await updateTask({
          id: initial.id,
          titulo: titulo.trim(),
          descripcion: descripcion.trim() || null,
          estado,
          prioridad,
          date: date || null,
        });
      } else {
        await createTask({
          titulo: titulo.trim(),
          descripcion: descripcion.trim() || null,
          estado,
          prioridad,
          date: date || null,
        });
        // limpiar formulario
        setTitulo("");
        setDescripcion("");
        setEstado("pendientes");
        setPrioridad("media");
        setDate("");
      }

      onSubmit?.(); // cerrar modal
    } catch (err: any) {
      setErrorMsg(err.message ?? "No se pudo guardar la tarea");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="task-form">
      {errorMsg && <p style={{ color: "tomato", marginBottom: 8 }}>{errorMsg}</p>}

      <label>
        Título 
        <input
          type="text"
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </label>

      <label>
        Descripción
        <textarea
          rows={5}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>

      <div className="form-row">
        <label>
          Estado
          <select value={estado} onChange={(e) => setEstado(e.target.value as any)}>
            <option value="pendientes">Por hacer</option>
            <option value="curso">En progreso</option>
            <option value="hechas">Completada</option>
          </select>
        </label>

        <label>
          Prioridad
          <select value={prioridad} onChange={(e) => setPrioridad(e.target.value as any)}>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </label>
      </div>

      <label>
        Fecha límite
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <button type="submit" className="guardarBtn" disabled={submitting}>
        {submitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

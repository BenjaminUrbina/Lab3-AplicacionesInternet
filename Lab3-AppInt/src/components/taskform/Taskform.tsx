import "../../styles/taskPage/Taskform.css";

type TaskFormProps = {
  onSubmit: () => void;
};

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>
        Título 
        <input type="text" required />
      </label>

      <label>
        Descripción
        <textarea rows={5}></textarea>
      </label>

      <div className="form-row">
        <label>
          Estado
          <select defaultValue="todo">
            <option value="todo">Por hacer</option>
            <option value="in_progress">En progreso</option>
            <option value="done">Completada</option>
          </select>
        </label>

        <label>
          Prioridad
          <select defaultValue="medium">
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </label>
      </div>

      <label>
        Fecha límite
        <input type="date" />
      </label>

      <button type="submit" className="guardarBtn">
        Guardar
      </button>
    </form>
  );
}

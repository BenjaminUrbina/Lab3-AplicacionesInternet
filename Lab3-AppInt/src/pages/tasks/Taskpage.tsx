import { useState } from "react";
import Modal from "../../components/modal/Modal";
import TaskForm from "../../components/taskform/Taskform";
import "../../styles/taskPage/Taskpage.css";

export default function TaskModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    alert("Tarea creada");
    setIsOpen(false);
  };

  return (
    <>
      <button className="openTaskBtn" onClick={() => setIsOpen(true)}>
        + Nueva Tarea
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Crear Tarea">
        <TaskForm onSubmit={handleSave} />
      </Modal>
    </>
  );
}

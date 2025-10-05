import React from "react";
import "../../styles/taskPage/TaskList.css";

type Task = {
  id: number;
  title: string;
  state: string;
};

type Props = {
  tasks: Task[];
  selectedTaskId: number | null;
  onSelect: (id: number) => void;
  onOpenNew: () => void;
};

const TaskList: React.FC<Props> = ({
  tasks,
  selectedTaskId,
  onSelect,
  onOpenNew,
}) => {
  return (
    <aside className="tp-tasklist">
      <button className="tp-add-btn" onClick={onOpenNew}>
        + Nueva Tarea
      </button>

      <div className="tp-tasks">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`tp-task-item ${
              selectedTaskId === task.id ? "active" : ""
            } tp-${task.state}`}
            onClick={() => onSelect(task.id)}
          >
            {task.title}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default TaskList;

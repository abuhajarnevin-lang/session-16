import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
const [filter, setFilter] = useState("all");
  
  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      console.log(data);
      setTasks(data);
    }

    fetchTasks();
  }, []);

  function changeTaskStatus(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
  if (filter === "completed") {
    return task.completed === true;
  }

  if (filter === "pending") {
    return task.completed === false;
  }

  return true;
});
  return (
    <div className="container mt-4">
    <div className="btn-group mb-4">
  <button
    className="btn btn-outline-primary"
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className="btn btn-outline-success"
    onClick={() => setFilter("completed")}
  >
    Completed
  </button>

  <button
    className="btn btn-outline-warning"
    onClick={() => setFilter("pending")}
  >
    Pending
  </button>
</div>


      <div className="row g-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="col-12 col-md-6 col-lg-4"
          >
            <div className="card h-100 shadow-sm">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>
                    {task.completed ? "Completed" : "Pending"}
                  </span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => changeTaskStatus(task.id)}
                  >
                    Change
                  </button>
                </div>

                <h5 className="card-title fw-bold">
                  {task.title}
                </h5>

                <small className="text-secondary">
                  Task ID: {task.id} · User ID: {task.userId}
                </small>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksPage;
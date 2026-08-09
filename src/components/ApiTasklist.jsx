import { useEffect, useState } from "react";

import { getTasks } from "../services/taskService";

import EmptyState from "./EmptyState";
import ErrorMessage from "./ErrorMessage";

function ApiTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch (requestError) {
        console.error("Load tasks error:", requestError);

        setTasks([]);

        setError(
          "Could not load tasks. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  function changeTaskStatus(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  if (loading) {
    return (
      <div className="container py-4">
        <p className="mt-3 mb-0">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>API Tasks</h2>

        <span className="badge text-bg-dark rounded-pill">
          Total {tasks.length}
        </span>
      </div>

      <div className="btn-group mb-4">
        <button className="btn btn-primary">Success</button>
        <button className="btn btn-outline-primary">Loading</button>
        <button className="btn btn-outline-primary">Error</button>
        <button className="btn btn-outline-primary">Empty</button>
      </div>

      <div className="row g-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="col-12 col-md-6 col-lg-4"
          >
            <div className="card border border-2 rounded-3 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span
                    className={`badge ${
                      task.completed
                        ? "text-bg-success"
                        : "text-bg-warning"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => changeTaskStatus(task.id)}
                  >
                    Change
                  </button>
                </div>

                <h5 className="fw-bold">
                  {task.title}
                </h5>

                <small className="text-secondary d-block">
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

export default ApiTaskList;
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=9")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <div className="container py-4">
      <h1 className="text-center mb-5">
        API Tasks & Cards
      </h1>

      <div className="row g-4">
        {tasks.map((task) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={task.id}
          >
            <div className="card shadow-sm h-100">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span
                    className={
                      task.completed
                        ? "badge text-bg-success"
                        : "badge text-bg-warning"
                    }
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      changeTaskStatus(task.id)
                    }
                  >
                    Change
                  </button>
                </div>

                <h4 className="fw-bold mb-4">
                  {task.title}
                </h4>

                <p className="mb-1">
                  <strong>Task ID:</strong>{" "}
                  {task.id}
                </p>

                <p className="mb-0">
                  <strong>User ID:</strong>{" "}
                  {task.userId}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
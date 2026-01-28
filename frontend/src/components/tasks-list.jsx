export function TasksList({
  data,
  handleToggleTask,
  setEditTask,
  handleDeleteTask,
}) {
  return (
    <ul id="todos">
      {data.length === 0 ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          No tasks found
        </div>
      ) : (
        data.map((task) => (
          <div key={task._id}>
            <li>
              {task.title} :{" "}
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                {task.description}
              </span>
            </li>

            <button
              type="button"
              onClick={() => {
                handleToggleTask(task._id);
              }}
              id="toggle-button"
              className={task?.status ? "completed" : ""}
            >
              {task.status ? "Mark Not Done" : "Mark Done"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditTask({
                  id: task._id,
                  title: task.title,
                  description: task.description,
                  status: task.status,
                });
              }}
              id="edit-button"
            >
              Edit
            </button>
            <button
              type="button"
              id="delete-button"
              onClick={() => {
                handleDeleteTask(task._id);
              }}
            >
              Delete Task
            </button>
          </div>
        ))
      )}
    </ul>
  );
}

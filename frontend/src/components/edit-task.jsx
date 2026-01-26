export function EditTask({
  handleEditTask,
  setEditTask,
  editTask,
  initialFormState,
}) {
  return (
    <form className="add-form" onSubmit={handleEditTask}>
      <input
        type="text"
        id="input"
        placeholder="Add a new task"
        required
        value={editTask.title}
        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
      />
      <textarea
        placeholder="Enter task description"
        required
        value={editTask.description}
        onChange={(e) =>
          setEditTask({ ...editTask, description: e.target.value })
        }
      />
      <div
        style={{
          display: "flex",
          gap: "1em",
          alignItems: "center",
          width: "100%",
        }}
      >
        <input
          id="status"
          type="checkbox"
          checked={editTask.status}
          onChange={(e) =>
            setEditTask({ ...editTask, status: e.target.checked })
          }
        />
        <label
          htmlFor="status"
          id="status"
          style={{
            width: "100%",
          }}
        >
          Task Completed
        </label>
      </div>
      <div
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <button
          id="cancel"
          type="button"
          onClick={() => {
            setEditTask({
              id: "",
              ...initialFormState,
            });
          }}
        >
          Cancel
        </button>
        <button id="add" type="submit">
          Save Task
        </button>
      </div>
    </form>
  );
}

import React from "react";
export function AddTask({ handleAddTask, setForm, form }) {
  return (
    <form className="add-form" onSubmit={handleAddTask}>
      <input
        type="text"
        id="input"
        placeholder="Add a new task"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Enter task description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
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
          checked={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.checked })}
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
      <button id="add" type="submit">
        Add Task
      </button>
    </form>
  );
}

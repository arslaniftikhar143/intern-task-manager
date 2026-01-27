export function TasksFilters({ query, setQuery, status, setStatus }) {
  return (
    <div className="task-filters">
      <input
        type="search"
        name="search-tasks"
        id="search-tasks"
        placeholder="Search tasks here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        name="status"
        id="task-status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Not Completed</option>
      </select>
    </div>
  );
}

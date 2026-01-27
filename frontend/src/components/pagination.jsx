export function Pagination({
  setCurrentPage,
  currentPage,
  pageLimit,
  setPageLimit,
  totalPages,
}) {
  return (
    <div className="pagination">
      <div className="pagination-buttons">
        {Array.from(
          {
            length: totalPages,
          },
          (_, index) => index + 1,
        ).map((page) => {
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          );
        })}
      </div>

      <select
        className="paginaton-limit"
        name="limit"
        id="page-limit"
        value={pageLimit}
        onChange={(e) => setPageLimit(e.target.value)}
      >
        <option value={10}>10 </option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}

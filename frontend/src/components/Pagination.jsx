import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages }) => {
    const isFirstPage = Number(currentPage) === 1;
    const isLastPage = Number(currentPage) === totalPages;

    return (
        <nav
            aria-label="Page navigation"
            className="d-flex justify-content-center mt-2"
        >
            <ul className="pagination">
                <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
                    <Link to={`?p=1`} className="page-link" aria-label="First">
                        <span aria-hidden="true">&laquo;&laquo;</span>
                    </Link>
                </li>
                <li className={`page-item ${isFirstPage ? "disabled" : ""}`}>
                    <Link
                        to={`?p=${currentPage - 1}`}
                        className="page-link"
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>

                {[...Array(totalPages).keys()].map((page) => (
                    <li
                        key={page + 1}
                        className={`page-item ${
                            currentPage === page + 1 ? "active" : ""
                        }`}
                    >
                        <Link to={`?p=${page + 1}`} className="page-link">
                            {page + 1}
                        </Link>
                    </li>
                ))}

                <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
                    <Link
                        to={`?p=${currentPage + 1}`}
                        className="page-link"
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
                <li className={`page-item ${isLastPage ? "disabled" : ""}`}>
                    <Link
                        to={`?p=${totalPages}`}
                        className="page-link"
                        aria-label="Last"
                    >
                        <span aria-hidden="true">&raquo;&raquo;</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

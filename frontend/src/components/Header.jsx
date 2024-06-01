import { Link } from "react-router-dom";
import { useGetPagesQuery } from "../slices/pagesApiSlice";

function Header() {
    const { data: pages, error } = useGetPagesQuery();

    return (
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Shirts & Fruit
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {error ? (
                            <p>{error.data.message}</p>
                        ) : (
                            pages?.map((page) => (
                                <li
                                    className={`nav-item ${
                                        page.slug === "home" ? "d-none" : ""
                                    }`}
                                    key={page._id}
                                >
                                    <Link className="nav-link" to={page.slug}>
                                        {page.name}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                    <ul className="navbar-nav justify-content-end w-100">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Log in
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Register
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
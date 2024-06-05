import { Link } from "react-router-dom";
import { useGetPagesQuery } from "../slices/pagesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "./AdminHeader";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

function Header() {
    const { data: pages, error } = useGetPagesQuery();

    const { userInfo } = useSelector((state) => state.auth);

    const [logoutApiCall] = useLogoutMutation();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        await logoutApiCall();
        dispatch(logout());
    };

    return (
        <header>
            {userInfo && userInfo.isAdmin && <AdminHeader />}
            <nav
                className="navbar navbar-expand-sm bg-body-tertiary"
                data-bs-theme="dark"
            >
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
                                        <Link
                                            className="nav-link"
                                            to={page.slug}
                                        >
                                            {page.name}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                        <ul className="navbar-nav justify-content-end w-100">
                            {userInfo ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="btn btn-info mx-2"
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-danger"
                                    >
                                        Hi {userInfo.username}, log out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/register"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;

import { Link } from "react-router-dom";

function AdminHeader() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/pages">
                                Pages
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/products">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/orders">
                                Orders
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AdminHeader;

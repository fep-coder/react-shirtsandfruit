import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Categories from "./components/Categories";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmallCart from "./components/SmallCart";

function App() {
    return (
        <>
            <Header />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-4">
                        <Categories />
                        <SmallCart />
                    </div>
                    <div className="col-8">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default App;

import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Categories from "./components/Categories";

function App() {
    return (
        <>
            <Header />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-4">
                        <Categories />
                    </div>
                    <div className="col">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;

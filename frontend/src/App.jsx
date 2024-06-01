import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-4">
                        <h4>Categories</h4>
                    </div>
                    <div className="col">
                        <h4>Products</h4>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;

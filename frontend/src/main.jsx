import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./screens/Page.jsx";
import ProductListing from "./screens/ProductListing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index path="/:slug?" element={<Page />} />
                        <Route
                            path="/category/:slug?"
                            element={<ProductListing />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

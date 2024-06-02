import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./screens/Page.jsx";
import ProductListing from "./screens/ProductListing.jsx";
import ProductDetails from "./screens/ProductDetails.jsx";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Pages from "./screens/Admin/Pages.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index path="/:slug?" element={<Page />} />
                        <Route
                            path="/product/:id?"
                            element={<ProductDetails />}
                        />
                        <Route
                            path="/category/:slug?"
                            element={<ProductListing />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="" element={<AdminRoute />}>
                            <Route path="/admin/pages" element={<Pages />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

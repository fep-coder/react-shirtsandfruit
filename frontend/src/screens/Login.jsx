import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: "" });
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = {};

        if (!formData.username.trim()) {
            errors.username = "Username is required";
        } else if (formData.username.length < 2) {
            errors.username = "Username must be at least 2 characters";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.length < 4) {
            errors.password = "Password must be at least 4 characters";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const userData = await login(formData).unwrap();
                dispatch(setCredentials({ ...userData }));
                navigate("/");
            } catch (error) {
                toast.error(error?.data?.message);
            }
        }
    }

    return (
        <div>
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleSubmit} className="col-6 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    {errors.username && (
                        <span className="error">{errors.username}</span>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <span className="error">{errors.password}</span>
                    )}
                </div>

                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;

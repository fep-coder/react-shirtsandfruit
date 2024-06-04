import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: "" });
    }

    const [register] = useRegisterMutation();

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = {};

        if (!formData.username.trim()) {
            errors.username = "Username is required";
        } else if (formData.username.length < 2) {
            errors.username = "Username must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
        } else if (formData.password.length < 4) {
            errors.password = "Password must be at least 4 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                await register(formData).unwrap();
                toast.success("Registration successful");
                navigate("/login");
            } catch (error) {
                toast.error(error?.data?.message);
            }
        }
    }

    return (
        <div>
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit} className="col-6 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        ref={inputRef}
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
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <span className="error">{errors.email}</span>
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

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <span className="error">{errors.confirmPassword}</span>
                    )}
                </div>

                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;

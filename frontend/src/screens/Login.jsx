import { useState } from "react";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        // setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <h2 className="text-center">Login</h2>
            <form className="col-6 mx-auto">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        className="form-control"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    {errors.username && (
                        <div className="invalid-feedback">
                            {errors.username}
                        </div>
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
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">
                            {errors.password}
                        </div>
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
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <div className="invalid-feedback">
                            {errors.confirmPassword}
                        </div>
                    )}
                </div>

                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;

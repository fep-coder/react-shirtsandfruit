import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddPage() {
    const [formData, setFormData] = useState({
        name: "",
        body: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: "" });
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Page title is required";
        } else if (formData.name.length < 4) {
            errors.name = "Page title must be at least 4 characters";
        }

        if (!formData.body.trim()) {
            errors.body = "Page body is required";
        } else if (formData.name.length < 10) {
            errors.body = "Page body must be at least 10 characters";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                navigate("/");
            } catch (error) {
                toast.error(error?.data?.message);
            }
        }
    }

    return (
        <div>
            <h2 className="text-center">Add Page</h2>
            <form onSubmit={handleSubmit} className="col-6 mx-auto">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Title
                    </label>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="body" className="form-label">
                        Password
                    </label>
                    <textarea
                        name="body"
                        id="body"
                        className="form-control"
                        value={formData.body}
                        onChange={handleChange}
                    ></textarea>
                    {errors.body && (
                        <span className="error">{errors.body}</span>
                    )}
                </div>

                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    );
}

export default AddPage;

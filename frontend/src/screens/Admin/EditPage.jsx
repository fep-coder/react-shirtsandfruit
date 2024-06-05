import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import {
    useEditPageMutation,
    useGetPageQuery,
} from "../../slices/pagesApiSlice";
import Loader from "../../components/Loader";

function EditPage() {
    const editor = useRef(null);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        body: "",
    });

    const { slug } = useParams();

    const { data: page, isLoading, error } = useGetPageQuery(slug);

    const [editPage] = useEditPageMutation();

    useEffect(() => {
        if (page) {
            setFormData({
                id: page._id,
                name: page.name,
                body: page.body,
            });
        }
    }, [page]);

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: "" });
    }

    const handleFormChange = (name, value) => {
        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: "" });
    };

    const handleJoditChange = (content) => {
        handleFormChange("body", content);
    };

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
        } else if (formData.body.length < 20) {
            errors.body = "Page body must be at least 20 characters";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                await editPage(formData).unwrap();
                toast.success("Page edited successfully");
                navigate("/admin/pages");
            } catch (error) {
                toast.error(error?.data?.message);
            }
        }
    }

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;
    return (
        <div>
            <h2 className="text-center">Edit Page</h2>
            <form onSubmit={handleSubmit} className="col-10 mx-auto">
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
                        Content
                    </label>
                    <JoditEditor
                        ref={editor}
                        name="body"
                        value={formData.body}
                        onChange={(newContent) => handleJoditChange(newContent)}
                    />
                    {errors.body && (
                        <span className="error">{errors.body}</span>
                    )}
                </div>

                <button className="btn btn-primary">Edit</button>
            </form>
        </div>
    );
}

export default EditPage;

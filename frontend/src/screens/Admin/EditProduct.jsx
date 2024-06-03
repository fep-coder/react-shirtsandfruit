import { useEffect, useState } from "react";
import {
    useEditProductMutation,
    useGetProductQuery,
} from "../../slices/productsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import MultipleImageUpload from "../../components/MultipleImageUpload";

function EditProduct() {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        productImage: "",
    });

    const { id } = useParams();

    const { data: product, isLoading, error } = useGetProductQuery(id);

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [editProduct] = useEditProductMutation();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (product) {
            setFormData({
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                image: null,
                productImage: product.image,
            });
        }
    }, [product]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            setFormData({ ...formData, [name]: e.target.files[0] });

            setSelectedFile(e.target.files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }

        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Product name is required";
        } else if (formData.name.length < 4) {
            errors.name = "Product name must be at least 4 characters";
        }

        if (!formData.description.trim()) {
            errors.description = "Product description is required";
        } else if (formData.description.length < 10) {
            errors.description =
                "Product description must be at least 10 characters";
        }

        const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
        if (!priceRegex.test(formData.price.toString())) {
            errors.price = "Please enter a valid price (e.g. 10 or 10.99)";
        }

        if (!formData.category.trim()) {
            errors.category = "Product category is required";
        }

        if (formData.image !== null) {
            const extension = formData.image.name
                .split(".")
                .pop()
                .toLowerCase();
            const allowedExtensions = ["jpg", "jpeg", "png"];
            if (!allowedExtensions.includes(extension)) {
                errors.image =
                    "Please upload a valid image (jpg, jpeg, or png)";
            }
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            // console.log("Form submitted:", formData);

            const formDataToSend = new FormData();

            formDataToSend.append("id", formData.id);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("image", formData.image);
            formDataToSend.append("productImage", formData.productImage);

            try {
                await editProduct(formDataToSend).unwrap();
                toast.success("Product edited successfully");
                navigate("/admin/products");
            } catch (error) {
                toast.error(error.data.message);
            }
        }
    };

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
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
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    {errors.description && (
                        <span className="error">{errors.description}</span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        step="0.01"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && (
                        <span className="error">{errors.price}</span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                        className="form-control"
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        <option value="shirts">Shirts</option>
                        <option value="fruit">Fruit</option>
                    </select>

                    {errors.category && (
                        <span className="error">{errors.category}</span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleChange}
                    />

                    {selectedFile && (
                        <img
                            src={preview}
                            style={{ width: "200px", marginTop: "10px" }}
                        />
                    )}

                    {errors.image && (
                        <span className="error">{errors.image}</span>
                    )}
                </div>

                <div className="mb-3">
                    <label>Current Image:</label>
                    <img
                        src={`/images/${formData.productImage}`}
                        style={{ width: "200px", marginTop: "10px" }}
                    />
                </div>

                <button className="btn btn-primary">Edit Product</button>
                <br />
                <Link
                    className="btn btn-sm btn-secondary my-2"
                    to="/admin/products"
                >
                    Back to all products
                </Link>
            </form>

            <MultipleImageUpload />
        </div>
    );
}

export default EditProduct;

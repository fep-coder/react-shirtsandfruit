import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

function Products() {
    const { data: products, isLoading, error } = useGetProductsQuery("all");
    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteProduct(id);
                toast.success("Product deleted successfully");
            } catch (error) {
                console.log(error);
                toast.error("Failed to delete product");
            }
        }
    };

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return (
        <div>
            <h2 className="mb-3">Admin Products</h2>

            <Link to="/admin/products/add" className="btn btn-primary">
                Add Product
            </Link>

            <table className="table mb-5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products?.map((product) => (
                        <tr key={product._id}>
                            <td className="align-middle">{product.name}</td>
                            <td className="align-middle">
                                ${product.price.toFixed(2)}
                            </td>
                            <td className="align-middle">{product.category}</td>
                            <td>
                                <img
                                    src={`/images/${product.image}`}
                                    alt={product.name}
                                    style={{ maxWidth: "100px" }}
                                />
                            </td>
                            <td className="align-middle">
                                <Link
                                    className="btn btn-sm btn-primary mx-1"
                                    to={`/admin/products/edit/${product._id}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Products;

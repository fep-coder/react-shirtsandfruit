import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import ProductGallery from "../components/ProductGallery";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data: product, isLoading, error } = useGetProductQuery(id);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success("Product added to cart");
    };

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return (
        <div className="row">
            <div className="col-4">
                <img
                    className="img-fluid"
                    src={`/images/${product.image}`}
                    alt={product.name}
                />
            </div>
            <div className="col">
                <h2>{product.name}</h2>
                <div>{product.description}</div>
                <br />
                <p
                    className="badge bg-success"
                    style={{ fontSize: "20px", marginTop: "10px" }}
                >
                    Price: ${product.price.toFixed(2)}
                </p>
                <br />
                <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to cart
                </button>
            </div>
            <ProductGallery id={id} />
        </div>
    );
}

export default ProductDetails;

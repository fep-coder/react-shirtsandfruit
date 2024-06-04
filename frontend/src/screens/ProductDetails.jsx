import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import ProductGallery from "../components/ProductGallery";

function ProductDetails() {
    const { id } = useParams();

    const { data: product, isLoading, error } = useGetProductQuery(id);

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
                <p>Price: ${product.price.toFixed(2)}</p>
                <button className="btn btn-primary">Add to cart</button>
            </div>
            <ProductGallery id={id} />
        </div>
    );
}

export default ProductDetails;

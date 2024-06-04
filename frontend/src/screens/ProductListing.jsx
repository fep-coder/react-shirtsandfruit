import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsApiSlice";

function ProductListing() {
    const { slug } = useParams();

    const { data: products, isLoading, error } = useGetProductsQuery(slug);

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return (
        <div className="row">
            <h1 className="mb-5">
                {slug.charAt(0).toUpperCase() + slug.slice(1)} products
            </h1>
            {products?.map((product) => (
                <div className="col-4 mb-3" key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <img
                            className="img-fluid"
                            src={`/images/${product.image}`}
                            alt={product.name}
                        />
                    </Link>
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <Link
                        className="btn btn-sm btn-primary"
                        to={`/product/${product._id}`}
                    >
                        View product details
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ProductListing;

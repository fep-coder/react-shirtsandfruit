import { useGetUserOrdersQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import CardItem from "../components/CardItem";

function Profile() {
    const { data: orders, isLoading, error } = useGetUserOrdersQuery();

    if (isLoading) return <Loader />;
    if (error) return <div>{error.data.message}</div>;

    return (
        <div>
            <h2>Orders</h2>
            <div className="row">
                {orders?.map((order) => (
                    <div className="col mb-3" key={order._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Order ID: {order._id}
                                </h5>
                                <p className="card-text">
                                    Placed on:{" "}
                                    {order.createdAt.substring(0, 10)}
                                </p>
                                <div className="row">
                                    {order.items.map((item) => (
                                        <CardItem key={item._id} item={item} />
                                    ))}
                                </div>
                                <p className="card-text mt-2">
                                    Grand Total: ${order.grandTotal.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;

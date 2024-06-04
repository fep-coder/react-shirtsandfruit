import { useDispatch, useSelector } from "react-redux";
import { addOne, clearCart, deleteItem, remove } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";

function Cart() {
    const { cartItems } = useSelector((state) => state.cart);

    const grandTotal = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [createOrder] = useCreateOrderMutation();

    const navigate = useNavigate();

    const handleAdd = (id) => {
        dispatch(addOne(id));
        toast.success("Item added to cart");
    };

    const handleRemove = (id) => {
        dispatch(remove(id));
        toast.success("Item removed from cart");
    };

    const handleDelete = (id) => {
        dispatch(deleteItem(id));
        toast.success("Item deleted from cart");
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success("Cart cleared");
    };

    const handleCheckout = async () => {
        try {
            await createOrder({
                items: cartItems,
                user: userInfo.id,
                grandTotal,
            }).unwrap();
            dispatch(clearCart());
            toast.success("Order created successfully");
            navigate("/order-placed");
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <div>
            {cartItems.length === 0 ? (
                <h3 className="text-center">Your cart is empty</h3>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item._id}>
                                <td className="align-middle">{item.name}</td>
                                <td>
                                    <img
                                        src={`/images/${item.image}`}
                                        alt={item.name}
                                        style={{ width: "100px" }}
                                    />
                                </td>
                                <td className="align-middle">${item.price}</td>
                                <td className="align-middle text-center">
                                    {item.quantity}
                                </td>
                                <td className="align-middle">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </td>
                                <td className="align-middle">
                                    <button
                                        className="btn btn-primary btn-sm mx-1"
                                        onClick={() => handleAdd(item._id)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="btn btn-info btn-sm mx-1"
                                        onClick={() => handleRemove(item._id)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm mx-1"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Clear
                                    </button>
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td colSpan="6" className="text-end">
                                <b>Grand Total:</b>: ${grandTotal.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="6" className="text-end">
                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </button>
                                {userInfo ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleCheckout}
                                    >
                                        Checkout
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            className="btn btn-info"
                                            to="/login?redirect=/cart"
                                        >
                                            Log in to checkout
                                        </Link>
                                    </>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Cart;

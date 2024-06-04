import { useSelector } from "react-redux";

function Cart() {
    const { cartItems } = useSelector((state) => state.cart);

    const grandTotal = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    console.log(grandTotal);

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
                                        className="btn btn-danger"
                                        onClick={() => {}}
                                    >
                                        Remove
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
                                    className="btn btn-primary"
                                    onClick={() => {}}
                                >
                                    Checkout
                                </button>
                                <button
                                    className="btn btn-danger mx-1"
                                    onClick={() => {}}
                                >
                                    Clear Cart
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Cart;

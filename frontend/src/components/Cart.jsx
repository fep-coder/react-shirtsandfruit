import { useSelector } from "react-redux";

function Cart() {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <div className="mt-3">
            {cartItems.length > 0 ? (
                <p>You have {cartItems.length} items in your cart</p>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}

export default Cart;

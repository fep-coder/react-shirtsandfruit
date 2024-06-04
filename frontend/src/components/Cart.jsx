import { useSelector } from "react-redux";

function Cart() {
    const { cartItems } = useSelector((state) => state.cart);

    const getTotalQuantity = (items) => {
        let total = 0;
        items.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };

    return (
        <div className="mt-3">
            {cartItems.length > 0 ? (
                <p>
                    You have {getTotalQuantity(cartItems)} item(s) in your cart
                </p>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}

export default Cart;

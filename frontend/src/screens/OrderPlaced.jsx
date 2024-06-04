import { Link } from "react-router-dom";

function OrderPlaced() {
    return (
        <div className="text-center">
            <h2 className="text-bg-success">Order placed successfully</h2>

            <h4>
                You can check the details and the status of your order in your{" "}
                <Link to="/profile">profile</Link>
            </h4>
        </div>
    );
}

export default OrderPlaced;

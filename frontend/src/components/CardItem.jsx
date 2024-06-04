function CardItem({ item }) {
    return (
        <div className="col-6 mb-3" key={item._id}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p>
                        <img
                            src={`/images/${item.image}`}
                            style={{
                                width: "100px",
                            }}
                        />
                    </p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default CardItem;

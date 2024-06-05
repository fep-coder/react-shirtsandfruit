import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function Rating({ rating }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i}>
                {rating >= i ? (
                    <FaStar />
                ) : rating >= parseInt(i - 1) + 0.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <FaRegStar />
                )}
            </span>
        );
    }

    return stars;
}

export default Rating;

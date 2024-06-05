import { useSelector } from "react-redux";
import {
    useCreateRatingMutation,
    useGetRatingByUserAndProductQuery,
} from "../slices/ratingsApiSlice";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";

function UserRating({ productId }) {
    const stars = [];

    const { data: userRating } = useGetRatingByUserAndProductQuery(productId);
    const [createRating] = useCreateRatingMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const handleClick = async (value) => {
        try {
            await createRating({
                value,
                product: productId,
                user: userInfo.id,
            }).unwrap();
            toast.success("Rating created successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create rating");
        }
    };

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span onClick={() => handleClick(i)} key={i}>
                {userRating >= i ? <FaStar /> : <FaRegStar />}
            </span>
        );
    }

    return stars;
}

export default UserRating;

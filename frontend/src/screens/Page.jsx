import { useParams } from "react-router-dom";
import { useGetPageQuery } from "../slices/pagesApiSlice";
import Loader from "../components/Loader";

function Page() {
    const { slug } = useParams();

    const currentSlug = slug || "home";
    // console.log(currentSlug);

    const { data: page, isLoading, error } = useGetPageQuery(currentSlug);

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return <div>{page?.body}</div>;
}

export default Page;

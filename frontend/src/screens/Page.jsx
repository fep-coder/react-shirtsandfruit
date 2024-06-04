import { useParams } from "react-router-dom";
import { useGetPageQuery } from "../slices/pagesApiSlice";
import Loader from "../components/Loader";
import HTMLReactParser from "html-react-parser";

function Page() {
    const { slug } = useParams();

    const currentSlug = slug || "home";
    // console.log(currentSlug);

    const { data: page, isLoading, error } = useGetPageQuery(currentSlug);

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return <div>{HTMLReactParser(page.body)}</div>;
}

export default Page;

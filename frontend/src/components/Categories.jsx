import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";

function Categories() {
    const { data: categories } = useGetCategoriesQuery();

    return (
        <>
            <h4>Categories</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to={`/category/all`}>All</Link>
                </li>
                {categories?.map((category) => (
                    <li className="list-group-item" key={category._id}>
                        <Link to={`/category/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Categories;

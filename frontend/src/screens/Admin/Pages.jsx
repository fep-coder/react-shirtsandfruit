import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGetPagesQuery } from "../../slices/pagesApiSlice";

function Pages() {
    const { data: pages, error, isLoading } = useGetPagesQuery();

    const deleteHandler = async (id) => {
        console.log(id);
    };

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return (
        <div>
            <h1>Admin Pages</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page) => (
                        <tr key={page._id}>
                            <td>{page._id}</td>
                            <td>{page.name}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mx-2"
                                    to={`/admin/pages/edit/${page._id}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteHandler(page._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pages;

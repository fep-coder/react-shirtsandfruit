import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import {
    useGetPagesQuery,
    useReorderPagesMutation,
} from "../../slices/pagesApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Pages() {
    const { data, error, isLoading } = useGetPagesQuery();

    const [pages, setPages] = useState(data || []);

    const [reorderPages] = useReorderPagesMutation();

    useEffect(() => {
        setPages(data);
    }, [data]);

    const onDragStart = (e, index) => {
        e.dataTransfer.setData("index", index);
    };

    const onDragOver = (e, slug) => {
        if (slug !== "home") {
            e.preventDefault();
        }
    };

    const onDrop = async (e, index) => {
        const draggedIndex = e.dataTransfer.getData("index");
        const updatedPages = [...pages];
        const movedPage = updatedPages.splice(draggedIndex, 1)[0];
        updatedPages.splice(index, 0, movedPage);

        setPages(updatedPages);

        const indexedArray = updatedPages.map((page) => page._id);

        try {
            await reorderPages(indexedArray);
            toast.success("Pages reordered successfully");
        } catch (error) {
            toast.error(error.data.message);
        }

        console.log(updatedPages);
    };

    const deleteHandler = async (id) => {
        console.log(id);
    };

    if (isLoading) return <Loader />;
    if (error) return <p>{error.data.message}</p>;

    return (
        <div>
            <h1>Admin Pages</h1>
            <table className="table sortable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pages?.map((page, index) => (
                        <tr
                            key={page._id}
                            className={page.slug}
                            draggable={page.slug !== "home"}
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragOver={(e) => onDragOver(e, page.slug)}
                            onDrop={(e) => onDrop(e, index)}
                        >
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

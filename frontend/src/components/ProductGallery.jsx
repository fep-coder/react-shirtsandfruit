import { useGetProductImagesQuery } from "../slices/productsApiSlice";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function ProductGallery({ id }) {
    const { data: images } = useGetProductImagesQuery(id);

    const galleryImages = images?.map((image) => ({
        original: `/gallery/${id}/${image}`,
        thumbnail: `/gallery/${id}/${image}`,
    }));

    return (
        <div className="mt-5">
            {galleryImages && galleryImages.length > 0 ? (
                <ImageGallery items={galleryImages} />
            ) : (
                <h3>No additional images available</h3>
            )}
        </div>
    );
}

export default ProductGallery;

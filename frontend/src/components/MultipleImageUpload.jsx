import { useState } from "react";
import { useUploadMultipleImagesMutation } from "../slices/productsApiSlice";
import { toast } from "react-toastify";
import Loader from "./Loader";

function MultipleImageUpload({ id }) {
    const [errors, setErrors] = useState([]);

    const [upload, { isLoading }] = useUploadMultipleImagesMutation();

    const handleChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);

        const selectedImages = selectedFiles.filter(
            (file) => file.type === "image/png" || file.type === "image/jpeg"
        );

        const rejectedFiles = selectedFiles.filter(
            (file) => !(file.type === "image/png" || file.type === "image/jpeg")
        );

        if (rejectedFiles.length > 0) {
            const errorMessages = rejectedFiles.map(
                (file) => `${file.name} is not an image`
            );

            setErrors(errorMessages);
        }

        try {
            const toUpload = new FormData();
            selectedImages.forEach((image) => {
                toUpload.append("images", image);
            });
            toUpload.append("id", id);

            await upload(toUpload);

            toast.success("Images uploaded successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to upload images.");
        }
    };

    return (
        <div className="mt-3 position-relative">
            <h2>Multiple Image Upload</h2>

            <input type="file" multiple onChange={handleChange} />

            {isLoading && <Loader />}
            {errors.length > 0 && (
                <div>
                    {errors.map((error, index) => (
                        <span className="error" key={index}>
                            {error}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultipleImageUpload;

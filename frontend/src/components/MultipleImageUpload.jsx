import { useState } from "react";

function MultipleImageUpload() {
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
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

        console.log(selectedFiles);
    };

    return (
        <div className="mt-3">
            <h2>Multiple Image Upload</h2>

            <input type="file" multiple onChange={handleChange} />

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

import React, {useState} from "react";
import "../../BookForm.css"
import api from "../../api/axios.js"

function BookForm({mode = "sell"}) {

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        edition: "",
        course: "",
        semester: "",
        category: "",
        description: "",
        condition: "",
        sellPrice: "",
        rentPrice: "",
        rentDuration: "",
        listForRent: false,
        listForSale: false,
        images: [],
        coverIndex: 0
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [coverIndex, setCoverIndex] = useState(0);

    const categories = [
        "Self Help",
        "Fiction",
        "Business",
        "Competitive Exams",
        "Academic Books",
        "Programming",
        "Engineering",
        "Medical",
        "School Books",
        "Novels"
    ];

    const courses = [
        "B.Tech CSE",
        "B.Tech IT",
        "B.Tech ECE",
        "B.Tech EE",
        "B.Tech Mechanical",
        "B.Tech Civil",
        "BCA",
        "MCA",
        "BBA",
        "MBA",
        "MBBS",
        "BDS",
        "B.Com",
        "M.Com",
        "BA",
        "MA",
        "Other"
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);

        // Check maximum limit
        if (formData.images.length + newFiles.length > 5) {
            alert("You can upload a maximum of 5 images.");
            return;
        }

        // Merge previous and new images
        const updatedImages = [...formData.images, ...newFiles];
        setFormData((prev) => ({
            ...prev,
            images: updatedImages,
        }));

        const updatedPreviews = [
            ...previewImages,
            ...newFiles.map((file) => URL.createObjectURL(file))
        ];

        setPreviewImages(updatedPreviews);

        // Reset input so the same image can be selected again if needed
        e.target.value = "";

        //if only one image is uploaded, make it a cover image 
        if (formData.images.length === 0) {
            setCoverIndex(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key !== "images") {
                    data.append(key, formData[key]);
                }
            });
            formData.images.forEach((image) => {
                data.append("images", image);
            });
            data.append("coverIndex", coverIndex);
            const endpoint =
                mode === "sell"
                    ? "/books/sell"
                    : "/books/rent";

            const response = await api.post(
                endpoint,
                data
            );

            console.log(response.data);
            alert("Book Listed Successfully!");

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return(
        <div className="bookFormContainer">

            <div className="bookFormHeader">
                <h1>
                    {mode === "sell"
                        ? " List Your Book For Sale"
                        : " List Your Book For Rent"}
                </h1>
                <p>Help another reader discover your book while earning from it.</p>
            </div>

            <form
                className="bookForm"
                onSubmit={handleSubmit}
            >

                {/* ---------------- BOOK INFORMATION ---------------- */}

                <div className="formCard">

                    <h2> Book Information</h2>
                    <p className="sectionText">
                            Tell buyers exactly what book you're listing.
                    </p>
                    <div className="formGrid">
                        <div className="inputGroup">
                            <label>Book Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Atomic Habits"
                                required
                            />

                        </div>

                        <div className="inputGroup">
                            <label>Author *</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="James Clear"
                                required
                            />

                        </div>

                        <div className="inputGroup">
                            <label>Edition</label>
                            <input
                                type="text"
                                name="edition"
                                value={formData.edition}
                                onChange={handleChange}
                                placeholder="2nd Edition"
                            />

                        </div>

                        <div className="inputGroup">
                            <label>Book Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                        {categories.map((category) => (

                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>

                                        ))}

                            </select>
                        </div>

                        {(formData.category === "Academic Books" ||
                            formData.category === "Engineering" ||
                            formData.category === "Medical") && (

                            <>
                                <div className="inputGroup">
                                    <label>Course</label>
                                    <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            Select Course
                                        </option>

                                        {courses.map((course) => (

                                            <option
                                                key={course}
                                                value={course}
                                            >
                                                {course}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div className="inputGroup">
                                    <label>Semester</label>
                                    <input
                                        type="number"
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                        placeholder="Eg. 4"
                                        min="1"
                                    />

                                </div>

                            </>

                        )}

                    </div>

                </div>

                {/* ---------------- BOOK DETAILS ---------------- */}

                <div className="formCard">
                    <h2> Book Details</h2>
                    <p className="sectionText">
                        Let buyers know the condition of your book.
                    </p>

                    <div className="conditionButtons">
                        {[
                            "New",
                            "Like New",
                            "Good",
                            "Fair"
                        ].map((condition) => (

                            <label
                                key={condition}
                                className={`conditionOption ${
                                    formData.condition === condition
                                        ? "activeCondition"
                                        : ""
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="condition"
                                    value={condition}
                                    checked={
                                        formData.condition === condition
                                    }
                                    onChange={handleChange}
                                />

                                {condition}

                            </label>

                        ))}

                    </div>

                    <div className="inputGroup">
                        <label>Description *</label>
                        <textarea
                            rows="5"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write about your book..."
                            required
                        />

                    </div>

                </div>

                {/* ---------------- SELL / RENT DETAILS ---------------- */}

                <div className="formCard">
                    <h2>
                        {mode === "sell"
                            ? " Selling Details"
                            : " Rental Details"}
                    </h2>
                    <p className="sectionText">
                        Set a fair price for your book.
                    </p>

                    {mode === "sell" ? (
                        <>
                            <div className="inputGroup">

                                <label>Selling Price *</label>

                                <input
                                    type="number"
                                    name="sellPrice"
                                    value={formData.sellPrice}
                                    onChange={handleChange}
                                    placeholder="₹ 300"
                                    min="1"
                                    required
                                />

                            </div>

                            <div className="checkboxCard">

                                <label className="checkboxLabel">

                                    <input
                                        type="checkbox"
                                        name="listForRent"
                                        checked={formData.listForRent}
                                        onChange={handleChange}
                                    />

                                    Also make this book available for Rent

                                </label>

                            </div>

                            {formData.listForRent && (

                                <div className="rentSection">

                                    <div className="inputGroup">
                                        <label>Rent Price *</label>
                                        <input
                                            type="number"
                                            name="rentPrice"
                                            value={formData.rentPrice}
                                            onChange={handleChange}
                                            placeholder="₹ 30"
                                            min="1"
                                        />

                                    </div>

                                    <div className="inputGroup">
                                        <label>Rent Duration (Days) *</label>
                                        <input
                                            type="number"
                                            name="rentDuration"
                                            value={formData.rentDuration}
                                            onChange={handleChange}
                                            placeholder="30"
                                            min="1"
                                        />

                                    </div>

                                </div>
                            )}

                        </>

                    ) : (

                        <>
                            <div className="inputGroup">
                                <label>Rent Price *</label>
                                <input
                                    type="number"
                                    name="rentPrice"
                                    value={formData.rentPrice}
                                    onChange={handleChange}
                                    placeholder="₹ 30"
                                    min="1"
                                    required
                                />

                            </div>

                            <div className="inputGroup">
                                <label>Rent Duration (Days) *</label>
                                <input
                                    type="number"
                                    name="rentDuration"
                                    value={formData.rentDuration}
                                    onChange={handleChange}
                                    placeholder="30"
                                    min="1"
                                    required
                                />

                            </div>

                            <div className="checkboxCard">
                                <label className="checkboxLabel">
                                    <input
                                        type="checkbox"
                                        name="listForSale"
                                        checked={formData.listForSale}
                                        onChange={handleChange}
                                    />

                                    Also make this book available for Sale

                                </label>

                            </div>

                            {formData.listForSale && (

                                <div className="inputGroup">
                                    <label>Selling Price *</label>
                                    <input
                                        type="number"
                                        name="sellPrice"
                                        value={formData.sellPrice}
                                        onChange={handleChange}
                                        placeholder="₹ 300"
                                        min="1"
                                    />

                                </div>

                            )}

                        </>

                    )}

                </div>


                {/* ---------------- IMAGES ---------------- */}

                <div className="formCard">

                    <h2> Book Photos</h2>

                    <p className="sectionText">
                        Upload between 1 and 5 clear images of your book.
                    </p>

                    <label
                        htmlFor="bookImages"
                        className="uploadBox"
                    >
                        <span className="uploadIcon">📷</span>
                        <h3>Upload Book Images</h3>
                        <p>
                            JPG • PNG • WEBP
                        </p>
                        <small>
                            Maximum 5 Images Allowed
                        </small>
                    </label>

                    <input
                        id="bookImages"
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />

                    {previewImages.length > 1 && (
                        <p className="coverInstruction">
                            ⭐ Click on any image below to make it the cover image.
                        </p>
                    )}

                    {previewImages.length > 0 && (

                        <div className="previewContainer">

                            {previewImages.map((image, index) => (

                                <div
                                    key={index}
                                    className={`previewImageCard ${
                                        coverIndex === index ? "coverSelected" : ""
                                    }`}
                                    onClick={() => setCoverIndex(index)}
                                >

                                    <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                    />

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* ---------------- SUBMIT ---------------- */}

                <button
                    type="submit"
                    className="submitButton"
                >
                    {mode === "sell"
                        ? " List My Book"
                        : " List Book For Rent"}
                </button>

            </form>

        </div>

    );

}




export default BookForm;






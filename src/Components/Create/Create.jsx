import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../store/FireBaseContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  // Validation function for a single field
const validateField = (fieldName, value) => {
  let error = "";
  switch (fieldName) {
    case "name":
      if (!value.trim()) error = "Name is required";
      break;
    case "category":
      if (!value.trim()) error = "Category is required";
      break;
    case "price":
      if (!value || Number(value) <= 0)
        error = "Price must be a positive number";
      break;
    case "image":
      if (!value) error = "Image is required";
      else {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(value.type))
          error = "Only JPG, PNG, or GIF images are allowed";
        const maxSize = 2 * 1024 * 1024;
        if (value.size > maxSize)
          error = "Image size must be less than 2MB";
      }
      break;
    default:
      break;
  }

  setErrors((prev) => ({ ...prev, [fieldName]: error }));
  return error; // ✅ return error so we can use immediately
};


  // Validate all fields
  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    return Object.keys(newErrors).length === 0;
  };

  // Handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    validateField("image", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const data = new FormData();
    data.append("file", formData.image);
    data.append("upload_preset", "olx-clone");
    data.append("folder", "dfucf2gsp");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfucf2gsp/image/upload",
        { method: "POST", body: data }
      );
      const json = await res.json();

      await addDoc(collection(db, "products"), {
        uid: user.uid,
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        imageUrl: json.secure_url,
        authProvider: "local",
        createdAt: new Date().toISOString(),
      });

      navigate("/");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading the product. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            onBlur={(e) => validateField("name", e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          {/* Category */}
          <label htmlFor="category">Category</label>
          <input
            className="input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}

          {/* Price */}
          <label htmlFor="price">Price</label>
          <input
            className="input"
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}

          {/* Image */}
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {errors.image && <p className="error">{errors.image}</p>}
          {formData.image && (
            <img
              alt="Preview"
              width="200"
              height="200"
              src={URL.createObjectURL(formData.image)}
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="uploadBtn"
          >
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;

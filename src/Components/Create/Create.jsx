import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext } from "../../store/FireBaseContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateField = (fieldName, value) => {
    let error = "";
    if (fieldName === "name") {
      if (!value.trim()) error = "Name is required";
    }
    if (fieldName === "category") {
      if (!value.trim()) error = "Category is required";
    }
    if (fieldName === "price") {
      if (!value || Number(value) <= 0) error = "Price must be a positive number";
    }
    if (fieldName === "image") {
      if (!value) error = "Image is required";
      else {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(value.type)) error = "Only JPG, PNG, or GIF images are allowed";
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (value.size > maxSize) error = "Image size must be less than 2MB";
      }
    }
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!price || Number(price) <= 0) newErrors.price = "Price must be a positive number";

    if (!image) {
      newErrors.image = "Image is required";
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(image.type)) {
        newErrors.image = "Only JPG, PNG, or GIF images are allowed";
      }
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (image.size > maxSize) {
        newErrors.image = "Image size must be less than 2MB";
      }
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "olx-clone"); // Your Cloudinary preset
    data.append("folder", "dfucf2gsp"); // optional

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfucf2gsp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const json = await res.json();

      await addDoc(collection(db, "products"), {
        uid: user.uid,
        name,
        category,
        price: Number(price),
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
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
            id="name"
            name="name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <br />

          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              validateField("category", e.target.value);
            }}
            id="category"
            name="category"
          />
          {errors.category && <p className="error">{errors.category}</p>}
          <br />

          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              validateField("price", e.target.value);
            }}
            id="price"
            name="price"
            min="0"
            step="0.01"
          />
          {errors.price && <p className="error">{errors.price}</p>}
          <br />

          <label htmlFor="image">Upload Image</label>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              validateField("image", file);
            }}
          />
          {errors.image && <p className="error">{errors.image}</p>}
          <br />

          {image && (
            <img
              alt="Preview"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <br />

          <button
            type="submit"
            className="uploadBtn"
            disabled={!name || !category || !price || !image}
          >
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;

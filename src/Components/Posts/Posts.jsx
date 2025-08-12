import React, { useState, useEffect, useContext } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { postDetailsContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";

// Import your BMW car image here
import bmwCarImage from "../../assets/Images/bmw-car.jpeg";

function Posts() {
  const [products, setProducts] = useState([]);
  const db = getFirestore();
  const { setPostDetails } = useContext(postDetailsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const allPost = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(allPost);
    };

    fetchData();
  }, [db]);

  console.log(products);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product, i) => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
                key={product.id || i}
              >
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src={bmwCarImage} alt="BMW Car" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 1500000</p>
              <span className="kilometer">Car</span>
              <p className="name">BMW 3 Series</p>
            </div>
            <div className="date">
              <span>01/04/2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;

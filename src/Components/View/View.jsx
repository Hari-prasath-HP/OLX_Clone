import React,{useEffect,useState,useContext} from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './View.css';
import { postDetailsContext } from '../../store/PostContext';
function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(postDetailsContext)


  useEffect(()=>{
      const db=getFirestore()
    const {uid}=postDetails 
    console.log(uid)
      const getUser = async (uid) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    setUserDetails(doc.data())
    console.log(doc.id, "=>", doc.data());
  });
};
getUser(uid)
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
      {userDetails&&<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.userName}</p>
          <p>{userDetails.phone}</p>
        </div>}  
      </div>
    </div>
  );
}
export default View;

import React, { useState,useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {addDoc, collection, getFirestore} from "firebase/firestore"
import Logo from '../../olx-logo.png';
import './Signup.css';

import {useNavigate} from 'react-router-dom'


export default function Signup() {
  const navigate = useNavigate()
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')

  const handleSubmit=async (e)=>{
    e.preventDefault()
     const auth = getAuth();
     const db=getFirestore()
 try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: userName });

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      userName,
      phone,
      email,
      authProvider: "local"
    });

    navigate("/login")
    console.log("User registered, profile updated, and data stored in Firestore!");
  } catch (error) {
    console.error("Signup error:", error.message);
  }
  }
  return (
    <div>
      <div className="signupParentDiv">
  
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
      </div>
    </div>
  );
}

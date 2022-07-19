import "./profile.css";
import Add from '../../components/Add'
import Feeds from '../../components/Feeds'
import Navbar from '../../components/Navbar'
import Rightbar from '../../components/Rightbar'
import Sidebar from '../../components/Sidebar'
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

export default function Profile() {
const [data, setData] =useState({})
console.log("state data",data.followings?.length);
const userr = useSelector((state)=>state.user.value)
const userId = userr._id

useEffect(()=>{
    const getUser =async () =>{
        var data =await axios.get(`/users/${userId}`)
        console.log("data",data);
        setData(data.data)
    } 
     getUser()
},[])


  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="/assets/person/7.jpeg"
                alt=""
              />
            </div>
            <button className="follobtn">{data.followings?.length} Following</button>
            <button className="follobtn">{data.followers?.length} Followers</button>
            <div className="profileInfo" >
           
                <h4 className="profileInfoName">{data.username}</h4>
                <Link to={`/edituser/${userId}`}>
             <IconButton >
               <Edit  />
             </IconButton>
                </Link>
            
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
           
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const Follow = ({ data }) => {
  let  id  = data.id
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
 
 
    
    async function handleFollow() {
      let follow = {
        followerId : loginUser.id,
        followedId: id
      }
      const response = await fetch("http://localhost:3000/follows", {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(follow)
      });
      const FollowRes = await response.json();
      console.log(FollowRes)
      alert(`${loginUser.userName} now following ${id}`)
      
    }
  


 
  return ( 
    <div>
      <Button id="followBtn" variant="warning" onClick={handleFollow}>Follow</Button>
    </div>
   );
}
 
export default Follow;
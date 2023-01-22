import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const Follow = ({ data }) => {
  let  id  = data.id
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  const [isFollow, setIsFollow] = useState(false);
  
  // const toggleFollowUnFollow = () => {
  //   if(isFollow){
  //     setIsFollow(false)
  //   } else {
  //     setIsFollow(true)
  //   }
  // }
 
 
   
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
        const followRes = await response.json();
        console.log(followRes)
        setIsFollow(true)
        if(followRes.msg === "new connection"){
          
          alert(`${loginUser.userName} now following ${id}`)
          
        }else{
          alert(`${followRes.msg}.`)
        }
      }
      
      async function handleUnFollow() {
        let unFollow = {
          followerId : loginUser.id,
          followedId: id,
        }
        const response = await fetch("http://localhost:3000/follows", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(unFollow)
        });
        await response.json()
        alert("you unfollowed this user")
      }
 


 
  return ( 
    <div className="d-flex justify-content-center">
      {isFollow? <Button id="followBtn" variant="warning" onClick={handleUnFollow}>unFollow</Button> :  <Button id="followBtn" variant="warning" onClick={handleFollow} >Follow</Button>}
        
       
      
    </div>
   );
}
 
export default Follow;
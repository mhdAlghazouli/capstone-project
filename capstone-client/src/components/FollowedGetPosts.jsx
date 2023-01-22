import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Likes from "./Likes";
import UnLikes from "./UnLikes";
import FollowPost from "./FollowPost";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';



const FollowedGetPosts = ({ followSectionData }) => {
  const [filteredFollowerData, setFilteredFollowerData] = useState([]);
  const followerUser = JSON.parse(window.localStorage.getItem("UserContext"));
  console.log(followSectionData)
  useEffect(() => {
    setFilteredFollowerData(followSectionData.filter((follower) => followerUser.id === follower.followerId ))
  },[followSectionData]);
 
  console.log(filteredFollowerData)
  return ( 
    <div>
      {filteredFollowerData.map(followedData => followedData.followed.Posts.length === 0 ? null : 
            followedData.followed.Posts.map(post =>
            <FollowPost key={post.id} post={post}/>)
        )}
   
    </div>
   );
}
 
export default FollowedGetPosts;
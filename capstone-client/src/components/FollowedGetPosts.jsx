import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

const FollowedGetPosts = ({ followSectionData }) => {
  const [filteredFollowerData, setFilteredFollowerData] = useState([]);
  const followerUser = JSON.parse(window.localStorage.getItem("UserContext"));
  useEffect(() => {
    setFilteredFollowerData(followSectionData.filter((follower) => followerUser.id === follower.followerId ))
  },[followSectionData]);
 
  console.log(filteredFollowerData)
  return ( 
    <div>
      {filteredFollowerData.map(followedData => followedData.followed.Posts.length === 0 ? null : 
            followedData.followed.Posts.map(post =><Card key={post.id} className="mb-2" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}> <Card.Body>{post.textContent}</Card.Body></Card>)
        )}

    </div>
   );
}
 
export default FollowedGetPosts;
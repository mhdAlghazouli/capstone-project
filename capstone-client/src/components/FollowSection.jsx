import { useState, useEffect } from "react";


const FollowSection = ({ followSectionData }) => {

  const [filteredFollowerData, setFilteredFollowerData] = useState([]);
 
  const followerUser = JSON.parse(window.localStorage.getItem("UserContext"));

  
  useEffect(() => {

    if(filteredFollowerData.length === 0){

      setFilteredFollowerData(followSectionData.filter((follower) => followerUser.id === follower.followerId ))
    }

    
  },[filteredFollowerData]);

  // useEffect(() => {
  //   if (!isFetching && !filteredFollowerData) {
  //     setIsFetching(true);
  //     setFilteredFollowerData(followSectionData.filter((follower) => followerUser.id === follower.followerId ))
  //   }
  // },[])
 
  console.log(filteredFollowerData)
  
  return ( 
    <div>
      {filteredFollowerData.map(follower => <p key={follower.id}>{follower.followed.userName}</p>)}
    </div>
   );
}
 
export default FollowSection;
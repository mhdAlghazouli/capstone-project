import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Follow from "./Follow";
import FollowProfilePost from "./FollowProfilePost";
import usePostsFetch from "../helpers/postsFetch";





const SearchUserProfile = () => {
  
  const { id } = useParams()
  const [data, setData] = useState(undefined);
  const { postsData, handleGetPosts } = usePostsFetch()
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"))
  console.log(loginUser)  
  //get user fetch
  async function handleSubmit() {
    const response = await fetch("http://localhost:3000/profile/" + id, {
      method: "GET",
      
    })
    const userRes = await response.json();
    setData(userRes)
    
  }
  useEffect(() => {
    handleSubmit() 
  }, [id])
  console.log(data)

  if(!data){
    return null;
  }
  
  return ( 
    <div>
      <Container> 
        <p style={{"textAlign": "center"}}><b>{data.oneUser && data.oneUser.userName}</b> Quack</p>
        <Follow className="m-3" data={data}/>
        {postsData && postsData.map(post => (
          data.oneUser.id === post.userId ? <FollowProfilePost key={post.id} post={post} handleGetPosts={handleGetPosts}/>
          : null
        ))}
      </Container>
    </div>
   );
}
 
export default SearchUserProfile;

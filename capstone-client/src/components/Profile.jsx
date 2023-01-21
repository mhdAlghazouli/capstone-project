import { useState, useEffect } from "react";
import Posts from "./Posts";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Post } from "./Post";
import FollowSection from "./FollowSection";
import FollowedGetPosts from "./FollowedGetPosts";

const Profile =  () => {
  const [data, setData]= useState(undefined);
  const [followSectionData, setFollowSectionData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  //post profile fetch
  async function handleSubmit() {
    await fetch("http://localhost:3000/profile", {
      method: "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        token : window.localStorage.getItem("jwt")
      })
    }).then(res => res.json())
    .then(userRes => {
      setData(userRes)
    }) 
  }
  console.log(postsData)
  // get followed fetch
  async function handleGetFollow() {
    console.log("useFollow fetch")
    const response = await fetch("http://localhost:3000/follows/" + loginUser.id, {
      method: "GET",
    });
    const followRes = await response.json();
    console.log(followRes)
    setFollowSectionData(followRes)
  }
  // get posts fetch
  async function handleGetPosts() {
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
    });
    const postsRes = await response.json();
   
    setPostsData(postsRes)
  }
  console.log(postsData)
  useEffect(() => {
    handleSubmit()
  }, [])

  useEffect(() => {
    handleGetFollow()
   }, [])

   useEffect(() => {
    if(postsData.length === 0){
      handleGetPosts()  
    }
  },[])

if(!data){
  return null;
}

return ( 
    <div> 
      <Row className="justify-content-md-between">
        <Col xs lg="3">
          <FollowSection followSectionData={followSectionData} />
        </Col>
        <Col md="6">
          <Posts data={data} setPostsData={setPostsData} />
          {postsData.map(post => (
            data.data.id === post.userId ? 
            <Post key={post.id} post={post} handleGetPosts={handleGetPosts}/>
            : null
          ))}
          <FollowedGetPosts followSectionData={followSectionData}/>
        </Col>
        <Col xs lg="3">
        
        </Col>
      </Row>
    </div>

  );
}

export default Profile;
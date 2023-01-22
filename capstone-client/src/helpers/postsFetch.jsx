import { useState, useEffect } from "react";

const usePostsFetch = () => {

  const [postsData, setPostsData] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  // get followed fetch
  async function handleGetPosts() {
    const response = await fetch("http://localhost:3000/posts/" + loginUser.id, {
      method: "GET",
    });
    const postsRes = await response.json();
    setPostsData(postsRes)
  }

  useEffect(() => {
    if(postsData.length === 0){
      handleGetPosts()  
    }
  },[])
   return { postsData, setPostsData, handleGetPosts }
}

export default usePostsFetch
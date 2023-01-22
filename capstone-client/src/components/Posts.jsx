import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



const Posts = ({ data,setPostsData }) => {
  const [image, setImage] = useState("");
  const [textContent, setTextContent] = useState("");

  function showContent() {
    document.getElementById("content-div").style.display = "block";
    document.getElementById("show-content-btn").style.display = "none";
  }
  
  //post a quack fetch
  async function handleSubmitPost(e){
    e.preventDefault();
    const post = {
      image: image,
      textContent: textContent,
      userId: data.data.id
    }

    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
      
    });
    const postRes = await response.json();
    console.log(postRes)
    if(postRes){
      setPostsData((prevState)=>[postRes,...prevState ])
      setTextContent('')
    }
    document.getElementById("content-div").style.display = "none";
    document.getElementById("show-content-btn").style.display = "block";
  } 

  return ( 
    <>
      <Form.Group className="mb-3 d-flex flex-column" style={{"textAlign": "center"}}>
        <Form.Label>Quack Quack <b>{data && data.data.firstName} {data && data.data.lastName}</b> </Form.Label>
        <Button variant="warning" id="show-content-btn" onClick={showContent}>Click here to post a quack</Button>
        <div id="content-div" style={{"display": "none"}}>
          <Form.Control type="file" placeholder="Add image" className="" onChange={(e) => setImage(e.target.value)}/>
          <Form.Control placeholder="Add a text" value={textContent} className="" onChange={(e) => setTextContent(e.target.value)}/>
          <Button variant="warning" type="submit" onClick={(e) => handleSubmitPost(e)}>Quack</Button>
        </div>
      </Form.Group>
      
    </>
   );
}
 
export default Posts;
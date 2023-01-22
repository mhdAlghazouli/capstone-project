import { useState } from "react";
import Likes from "./Likes";
import UnLikes from "./UnLikes";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { RiDeleteBin7Line, RiEditLine } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import moment from 'moment';

export const Post = ({post, handleGetPosts})=>{
console.log(post)
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
  const [isShowIconWindowOpen, setIsShowIconWindowOpen] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newTextContent, setNewTextContent] = useState("");
  const [likesCount, setLikesCount] = useState(post.Likes ? post.Likes.length : 0);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  
  
  const toggleShowIconsWindowOpen = () => {
    if(isShowIconWindowOpen) {
      setIsShowIconWindowOpen(false)
    }else{
      setIsShowIconWindowOpen(true)
    }
  }

  const toggleEditWindow = () => {
    if(isEditWindowOpen){
      setIsEditWindowOpen(false)
    } else {
      setIsEditWindowOpen(true)
    }
  }

  //handle Delete
async function handleDelete(id) {
  
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  await response.json();
  handleGetPosts()
 }


//handleEdit
async function handleEdit(){
  const updatedPost = {
    id: post.id,
    image: newImage,
    textContent: newTextContent,
    
  }
  const response = await fetch ("http://localhost:3000/posts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPost)

  })
  const updatedPostRes = await response.json();
  if(updatedPostRes){
    handleGetPosts()
    setIsEditWindowOpen(false)
  }
}

  return <Card  className="mb-2" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
          <Card.Body>
            <Row >
              <Col md="8" >
                <Card.Text className="d-flex " style={{"textAlign": "start"}}>
                  {loginUser.userName}
                  <br />
                  {moment(post.createdAt).fromNow()}
                </Card.Text>
                
              </Col>
              <Col md="4" className="d-flex justify-content-end align-items-start">
              <Button variant="warning" value={post.id} onClick={toggleShowIconsWindowOpen}>
                <RxDotsHorizontal />
                </Button>
                
                {isShowIconWindowOpen && <div > <Button variant="warning" value={post.id} onClick={() => handleDelete(post.id)}>
                <RiDeleteBin7Line />
                </Button>
                <Button variant="warning" value={post.id} className="show-btn" onClick={toggleEditWindow}>
                <RiEditLine />
                </Button> </div>}
                
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text>
                  {post.textContent}
                </Card.Text>
              </Col>
            </Row>
            {isEditWindowOpen && <div id="content-div-1" className="mt-2 content-div-1" value={post.id}>
              <Form.Control type="file" placeholder="Add image" onChange={(e) => setNewImage(e.target.value)}/>
              <Form.Control placeholder="Add a text" onChange={(e) => setNewTextContent(e.target.value)}/>
              <Button value={post.id}  variant="warning" type="submit" onClick={handleEdit}>Update</Button>
            </div>}
            <Row>
              <Col className="d-flex justify-content-start">
                <Row >
                  <Col>
                    <Likes post={post} setLikesCount={setLikesCount}/>
                  </Col>
                  <Col>
                    <UnLikes post={post} setLikesCount={setLikesCount}/>
                  </Col>
                </Row>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                {likesCount} like
              </Col>
            </Row>
          </Card.Body>
        </Card>
}
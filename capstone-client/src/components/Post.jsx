import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { RiDeleteBin7Line, RiEditLine } from "react-icons/ri";

export const Post = ({post, handleGetPosts})=>{
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newTextContent, setNewTextContent] = useState("");
  
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
    method: "DELETE"
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
            <Row className="d-flex align-items-center">
              <Col md="8">
                <Card.Text>
                {post.textContent}
                </Card.Text>
              </Col>
              <Col md="4" className="d-flex justify-content-around">
                
                <Button variant="warning" value={post.id} onClick={() => handleDelete(post.id)}>
                <RiDeleteBin7Line />
                </Button>
                <Button variant="warning" value={post.id} className="show-btn" onClick={toggleEditWindow}>
                <RiEditLine />
                </Button>
              </Col>
            </Row>
            {isEditWindowOpen && <div id="content-div-1" className="mt-2 content-div-1" value={post.id}>
              <Form.Control type="file" placeholder="Add image" onChange={(e) => setNewImage(e.target.value)}/>
              <Form.Control placeholder="Add a text" onChange={(e) => setNewTextContent(e.target.value)}/>
              <Button value={post.id}  variant="warning" type="submit" onClick={handleEdit}>Update</Button>
            </div>}
          </Card.Body>
        </Card>
}
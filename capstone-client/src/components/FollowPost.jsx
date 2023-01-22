import Likes from "./Likes";
import UnLikes from "./UnLikes";
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
const FollowPost = ({post}) => {
  const [likesCount, setLikesCount] = useState( post.Likes ? post.Likes.length : 0);
  return ( 
    <Card key={post.id} className="mb-2" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}> 
              <Card.Body>
                <Row>
                  <Col >
                    <Card.Text className="d-flex" style={{"textAlign": "start"}}>
                      {post.User.userName}
                      <br />
                      {moment(post.createdAt).fromNow()}
                    </Card.Text>
                    
                  </Col>

                </Row>
                <Row>
                  <Col>{post.textContent}</Col>
                </Row>
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
                  <Col className="d-flex justify-content-end align-items-center">{likesCount} like</Col>
                </Row>
              </Card.Body>
            </Card>
   );
}
 
export default FollowPost;
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const GetComment = ({ commentData }) => {
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));
  return ( 
    <>
       { commentData.map(comment => 
        <Card className="mt-2" key={comment.id}>
          <Row>
            <Col className='d-flex px-4'>
              {comment.User ? comment.User.userName : loginUser.userName}
            </Col>
            <Col>
              {comment.commentText}
            </Col>
            <Col>

            </Col>
          </Row>
          
        </Card>
        )}
    </> 
  );
}
 
export default GetComment;
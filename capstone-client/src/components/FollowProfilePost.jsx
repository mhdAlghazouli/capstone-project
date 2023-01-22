import Card from 'react-bootstrap/Card';


const FollowProfilePost = ({post}) => {
  return ( 
    <Card  className="mb-2" style={{"width": "100%", "boxShadow": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"}}>
          <Card.Body>
            
                <Card.Text>
         
                {post && post.textContent}
                </Card.Text>
          </Card.Body>
    </Card>
   );
}
 
export default FollowProfilePost;
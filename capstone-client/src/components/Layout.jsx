import SearchDucks from "./SearchDucks";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



const Layout = () => {  
  const [usersData, setUsersData] = useState([]);
  const loginUser = JSON.parse(window.localStorage.getItem("UserContext"));

   async function handleClick() {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
    });
    const usersRes = await response.json();
    console.log(usersRes)
    if(loginUser){

      setUsersData(usersRes.user.filter(user => loginUser.id !== user.id))
    }else{
      return ;
    }
   }
   useEffect( () => {
     setTimeout(() => {
       handleClick()

     }, 5000)
   },[])


  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }
  
  return ( 
    <Navbar bg="warning" className="mb-3">
      <Container>
        <Col md="2" className="d-flex justify-content-start align-items-center">
        
        <Navbar.Brand as={Link} to="/profile" className="text-white">Quacker</Navbar.Brand>
        </Col>
            {localStorage.getItem("jwt") ? null : 
            <Col className="d-flex justify-content-end">
              
                  <Nav >
                    <Nav.Link as={Link} to="/" className="text-white">Login</Nav.Link>
                    <Nav.Link  as={Link} to="/signup" className="text-white">Sign up</Nav.Link>
                  </Nav>
               
            
            </Col>
            }
            {localStorage.getItem("jwt") ? 
            <Col className="d-flex ">
              
                  <Col md="10" className="d-flex justify-content-center align-items-center">
                    <SearchDucks  usersData={usersData}/>
                  </Col >
            
            
                  <Col className="d-flex justify-content-end align-items-center">
                    <Nav.Link onClick={logout} className="text-white">Logout</Nav.Link>

                  </Col>
           
            
            </Col>
            
            : null}
        </Container>
      </Navbar>
   );
}
 
export default Layout;
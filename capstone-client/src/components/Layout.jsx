import SearchDucks from "./SearchDucks";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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
    if(loginUser){

      setUsersData(usersRes.user.filter(user => loginUser.id !== user.id))
    }else{
      return ;
    }
   }
   useEffect( () => {
    handleClick()
   },[])


  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/');
  }
  
  return ( 
    <Navbar bg="warning" className="mb-3">
      <Container>
        <Navbar.Brand href="#" className="text-white">DuckQuack</Navbar.Brand>
            {localStorage.getItem("jwt") ? null : 
          <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-end">
              <Nav className="d-flex justify-content-end">
                <Nav.Link as={Link} to="/" className="text-white">Login</Nav.Link>
                <Nav.Link  as={Link} to="/signup" className="text-white">Sign up</Nav.Link>
              </Nav>
             </Navbar.Collapse >
            }
            {localStorage.getItem("jwt") ? 
            <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-between">
              <SearchDucks usersData={usersData}/>
              <Nav.Link onClick={logout} className="text-white">Logout</Nav.Link>
            </Navbar.Collapse>
            : null}
        </Container>
      </Navbar>
   );
}
 
export default Layout;
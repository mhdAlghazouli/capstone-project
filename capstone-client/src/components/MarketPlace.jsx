import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ImProfile } from "react-icons/im";
import { FaStoreAlt,FaHome, FaStore } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import MarketPlaceLeftSide from "./MarketPlaceLeftSide";
import MarketPlaceAllProducts from "./MarketPlaceAllProduct";


const MarketPlace = () => {
  return ( 
   <Row>
     <Col md="3">
      <MarketPlaceLeftSide />
        
     </Col>
     <Col md="9">
     
    
     </Col>
   </Row>
   );
}
 
export default MarketPlace;
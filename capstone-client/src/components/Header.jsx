import Layout from "./Layout"
import ThemeContext from "../index"
import { useState, useEffect, useContext } from 'react';

const Header = (props) => {
  // const { value } = useContext(ThemeContext)
  return ( 
    <>
      <Layout data={props.data}/>
    </>
   );
}
 
export default Header;
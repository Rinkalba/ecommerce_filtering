import React, { useEffect, useState } from "react";
import "../styles/style.css"
import logo from "../assets/logo.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Container,
  Dropdown,
  Form,
  Navbar,
  NavbarBrand,
  Row,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {state:{cart},dispatch,productDispatch}=CartState();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  
  return (
    <>
        <Container fluid className={`header ${isSticky ? 'sticky' : ''}`}>
  <Row>
    <Col className="my-auto">
    <div className="d-flex flex-row">
                <Link to="/" style={{marginRight:"10px",color:"black",textDecoration: "underline"}}>HOME</Link>
                <Link href="" className="text-dark">SHOP</Link>
              </div>
    </Col>
    <Col className="text-center">
    <NavbarBrand>
    <Link to="/">

                <img
                  src={logo}
                  width="50"
                  height="50"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
    </Link>
              </NavbarBrand>
    </Col>
    <Col className="my-auto">
    <div className="d-flex flex-row text-end justify-content-around">
               <Navbar.Text className="search">
                <Form.Control style={{width:"90%",height:30,boxShadow:"none"}} placeholder="Search Your Item" onChange={(e)=>{productDispatch({type:"FILTER_BY_SEARCH",payload:e.target.value})}}/>
               </Navbar.Text>
                <Link className="text-dark my-auto">
                <Dropdown className="my-auto">
                
                <Dropdown.Toggle variant="success" className="p-1 btn-success" id="dropdown-basic" >
                  <FontAwesomeIcon icon={faCartShopping} className="me-2"  />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-danger">{cart.length}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{minWidth:370}}>
                  {cart.length>0?(
                    <>
                      {cart.map((prod)=>(
                        <span className="cartitem" key={prod.id}>
                          <img src={prod.img} className="cartItemImg" alt={prod.name}/>
                          <div className="cartItemDetail">
                            <span>{prod.name}</span>
                            <span>₹ {prod.price}</span>
                          </div>
                          <AiFillDelete fontSize="15px" style={{cursor:"pointer"}} onClick={()=> dispatch({type:"REMOVE_FROM_CART",payload:prod})}/>
                        </span>
                      ))}
                      <Link to="/cart">
                        <Button className="btn-primary" style={{width:"95%",margin:"0 4%"}}>Go to Cart</Button>
                      </Link>
                    </>
                  ):(<span style={{padding:10}}>Cart is Empty!</span>)}
                  
                  

                </Dropdown.Menu>
              </Dropdown>
             
                </Link>
                <Link className="text-dark my-auto">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </div>
    </Col>
  </Row>

</Container>
    </>
  );
};

export default Header;

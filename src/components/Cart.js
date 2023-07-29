import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import {Col, Image, ListGroup, Row,Form} from "react-bootstrap"
import { Button } from 'react-bootstrap'
import Rating from './Rating'
import { AiFillDelete } from 'react-icons/ai'


const Cart = () => {
  const {state:{cart},dispatch}=CartState()
  const [total,setTotal]=useState();

  useEffect(()=>{
    setTotal(cart.reduce((acc,curr)=> acc + Number(curr.price)*curr.qty,0));
  })
  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod)=>(
            <ListGroup key={prod.id} className="mb-2">
            <ListGroup.Item>

            <Row>
            <Col md={2}>
              <Image src={prod.img} alt={prod.name} style={{width:300,height:150,objectFit:"cover"}} fluid rounded/>
            </Col>
              <Col md={2}>
                <span>{prod.name}</span>
               </Col>
               <Col md={2}>
                <span>₹ {prod.price}</span>
               </Col>
               <Col md={2}>
                <Rating rating={prod.ratings}/>
               </Col>
               <Col md={2}>
                 <Form.Control as="select" value={prod.qty} onChange={(e)=> dispatch({type:"CHANGE_CART_QTY",payload:{id:prod.id,qty:e.target.value}})}>
                   {[...Array(prod.inStock).keys()].map((x)=>(
                     <option key={x+1}>{x+1}</option>
                   ))}
                 </Form.Control>
               </Col>
               <Col md={2}>
                 <Button type="button"  className="me-2" variant="light" onClick={()=> dispatch({type:"REMOVE_FROM_CART",payload:prod})}><AiFillDelete fontSize="15px"/></Button>
               </Col>
            </Row>
            </ListGroup.Item>

            </ListGroup>

          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <h4 className="text-center mb-4">Subtotal({cart.length}) {cart.length>1?'items':'item'} </h4>
        <span style={{fontWeight:700,fontSize:20}}>Total: ₹ {total}</span>
        <Button type="button" disabled={cart.length===0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}

export default Cart;
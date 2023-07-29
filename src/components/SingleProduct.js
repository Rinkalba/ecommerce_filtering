import React from 'react'
import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Rating from './Rating'
import {IoIosRemoveCircleOutline} from "react-icons/io"
import {LiaCartPlusSolid} from "react-icons/lia"
import { CartState } from '../context/Context'

const SingleProduct = ({prod}) => {
  const {state:{cart},dispatch }  =CartState()
  // console.log(cart);
  return (
    <div>
        <Card className="products mb-3">
          <Card.Img variant="top" src={prod.img} alt={prod.name} style={{height:200,width:200,objectFit:'cover',overflow:'hidden'}}/>
          <Card.Body>
            <Card.Title>{prod.name}</Card.Title>
            <Card.Subtitle style={{paddingBottom:10}}>
              <span>₹ {prod.price}</span>
              <Rating rating={prod.ratings}/>
            </Card.Subtitle>
            <div className="text-center">
            {
              cart.some(p=>p.id===prod.id)?
              (<Button onClick={()=>{dispatch({type:"REMOVE_FROM_CART",payload:prod});}} className="mb-2" size="sm" variant='danger'><IoIosRemoveCircleOutline fontSize="13px"/>Remove from cart</Button>):
              ( <Button onClick={()=>{dispatch({type:"ADD_TO_CART",payload:prod});}} size="sm"><LiaCartPlusSolid fontSize="20px" />Add to cart</Button>)
            }
            
           
            </div>
          </Card.Body>
        </Card>
    </div>
  )
}

export default SingleProduct
import {Button, Form} from "react-bootstrap"
import Rating from "./Rating"
// import { useState } from "react"
import { CartState } from "../context/Context";

const Filter = () => {
    // const [rate,setRate]=useState(2);
    const {productState:{byRating,sort},productDispatch}=CartState();
    // console.log(productState,productDispatch);
    console.log(sort);
  return (
    <div className="filters">
        <h5 className="text-center mb-4">Filter Products</h5>
        <span className="mb-2">
            <Form.Check 
                inline
                label="Ascending"
                name="group1"
                type="radio"
                id={`inline-1`}
                onChange={()=>productDispatch({
                    type:"SORT_BY_PRICE",
                    payload:"lowToHigh",
                })}
                checked={sort === 'lowToHigh'?true:false}
            /> 
        </span>
        <span className="mb-2">
        <Form.Check 
            inline 
            label="Decending" 
            name="group1" 
            type="radio" 
            id={`inline-2`} 
            onChange={()=>productDispatch({
                    type:"SORT_BY_PRICE",
                    payload:"highToLow",
                })}
                checked={sort === 'highToLow'?true:false}
        />
        </span>
        <span className="mb-2">
            <Form.Check 
                inline
                label="Include Out of Stock"
                name="group1"
                type="checkbox"
                id={`inline-3`} 
            />
        </span>
        <span className="mb-2">
            <Form.Check 
                inline
                label="Fast Delivery Only"
                name="group1"
                type="checkbox"
                id={`inline-4`}
            />
        </span>
        <span>
            <label style={{paddingRight:10}}>Rating:</label>
            <Rating rating={byRating} onClick={(i)=>productDispatch({type:"FILTER_BY_RATING",payload:i+1}) } style={{cursor:"pointer"}}/>
        </span>
        <Button variant="light" size="sm" onClick={()=>productDispatch({type:"CLEAR_FLITERS"})}>Clear Filters</Button>
    </div>
  )
}

export default Filter
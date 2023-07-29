import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct';
import "../styles/style.css"
import Filter from './Filter';

const Home = () => {
  const {state:{products},
productState:{sort,byRating,searchQuery}}=CartState();
  // console.log(products);

  const transfromProducts=()=>{
    let sortedProducts=products;

    if(sort){
      sortedProducts=sortedProducts.sort((a,b)=>(
        sort==='lowToHigh'?a.price-b.price:b.price-a.price
      ))
    }

    if(byRating){
      sortedProducts=sortedProducts.filter((prod)=>prod.ratings <= byRating)
    }

    if(searchQuery){
      sortedProducts=sortedProducts.filter((prod)=>prod.name.toLowerCase().includes(searchQuery))
    }
    return sortedProducts;
  }
  return (
    <div className="home">
      <Filter/>
      <div className="productContainer">
        {
          transfromProducts().map((prod)=>{
            return <SingleProduct prod={prod} key={prod.id}/>
          })
        }
      </div>
    </div>
  )
}

export default Home
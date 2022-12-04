import {React, useState, useEffect} from 'react'
import ItemComponent from './ItemComponent';

const TestAPI = () => {
    const[listOfProducts, setProducts] = useState([])
    useEffect(()=>{
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data.products)
        });
    }, [])

  return (
    <div className='item-container'>
      {listOfProducts.map((item, index)=>{
        return(
            <ItemComponent
                key = {item.id}
                title = {item.title}
                description = {item.description}
                price = {item.price}
                rating = {item.rating}
                image = {item.images[0]}
            ></ItemComponent>
        )
        console.log(item)
      })}
    </div>
  )
}

export default TestAPI

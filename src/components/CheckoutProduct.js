import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import CurrencyFormat from '../helpers/CurrencyFormat'
import { useDispatch } from 'react-redux'
import { addToCart,removeFromCart } from '../slices/cartSlice'

function CheckoutProduct({
        id,
        title,
        price,
        description,
        rating,
        category,
        image,
        hasPrime,
}) {
  const dispatch = useDispatch();
  const addItemstoCart= ()=>{
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
      
    };// Sending the product as an action REDUX store
    dispatch(addToCart(product));

  };
  
  const removeItemsFromCart = ()=>{
    //Remove item from Branch
    dispatch(removeFromCart({id}))
  }
  return (
    <div className="grid grid-cols-5">
         {/* left wala section  isne 1 col liya */}
        <Image src={image} height={200} width={200} objectFit='contain'/>
         {/* middle wala section jo 3 col lega */}
         <div className="col-span-3 mx-5">
            <p>{title}</p>
            <div className='flex'>
                {Array(rating).fill().map((_,i)=>(
                    <StarIcon key={i} className="h-5 text-yellow-500"/>
                ))}
            </div>
            <p className="text-xs my-2">{description}</p>
            <CurrencyFormat price={price}/> 
            {hasPrime && (
           <div className="flex items-center space-x-2">
            <img className="w-12 " loading='lazy' src="https://i.imgur.com/CJJQBcC.png" alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery </p>
          </div>
          )}  
          
         </div>
         {/* Right wala add/remove button */}
         <div className="flex flex-col space-y-2 my-auto justify-self-end">
         <button className="button mt-auto" onClick={addItemstoCart}>Add To Cart</button>
         <button className="button mt-auto" onClick={removeItemsFromCart}>Remove Your Cart</button>
         </div>
         

    </div>
  )
}

export default CheckoutProduct
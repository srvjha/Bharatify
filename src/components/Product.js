import React, { useState ,useEffect} from 'react'
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import CurrencyFormat from '../helpers/CurrencyFormat';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
const MAX_RATING =5;
const MIN_RATING=1;


function Product({id,title,price,description,category,image}) {
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
        
      };
      
      // Sending the product as an action REDUX store... the cart Slice
      dispatch(addToCart(product));

    };
  
    const [rating, setRating] = useState(0);
    const [hasPrime,setPrime] = useState(0);


    useEffect(() => {
      // This code will run only on the client-side
      const randomRating = Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;
      setRating(randomRating);
      const randomeStat = Math.random() < 0.5 ;
      setPrime(randomeStat);
    }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400"> {category}</p>
        <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        />
        <h4 className="my-3">{title}</h4>
        
        {/* Fetching Product Details with random ratings */}
        <div className="flex">
            {Array(rating) // Here hum spread operator bhi use kr skte hai uske code esa hoga--> [...Array(rating)]
            .fill()
            // The fill() method, on the other hand, is useful when you need to initialize an array with a specific value or when you want to fill an array with a default value. It modifies the existing array by filling its elements with the specified value. If you need an array of a specific length and want all elements to have a particular value, fill() can be a handy choice. However, in your original code snippet, using fill() without providing any value resulted in the elements being filled with undefined, which was not suitable for the desired rendering.
            .map((_,i)=>(
                <StarIcon className="h-5 text-yellow-500"/>
                
            ))}            
        </div>

        <p className="text-xs my-2 truncate-2-lines">{description}</p>
        

        <div className="mb-5">
        <CurrencyFormat
        price={price}
        /> 
        </div>
        
        {hasPrime && (
           <div className="flex items-center space-x-2 -mt-5">
            <img className="w-12" src="https://i.imgur.com/CJJQBcC.png" alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery </p>
          </div>
          )}  

          <button onClick={addItemstoCart} className="mt-auto button">Add to Cart</button>      
    </div>
  );
}

export default Product;
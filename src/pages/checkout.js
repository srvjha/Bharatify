import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/cartSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import { useSession } from 'next-auth/react'
import CurrencyFormat from '../helpers/CurrencyFormat'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
const stripePromise = loadStripe(process.env.stripe_public_key);



function Checkout() {
  const items = useSelector(selectItems);
  const {data: session} =useSession();
  const total = useSelector(selectTotal);
  const createCheckoutSession = async ()=>{
   const stripe = await stripePromise;
   // Call the backend to create a checkout session... 
   const checkoutSession = await axios.post('/api/create-checkout-session',
   {
    items:items,
    email:session.user.email

   });

   // Redirect user/customer to Stripe Checkout
   const result = await stripe.redirectToCheckout({
    sessionId:checkoutSession.data.id
   })

   if(result.error){
    alert(result.error.message);
   }
  };


  return (
    <div className="bg-gray-100">
       <Header/>
       <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left part of Page */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
          src="https://links.papareact.com/ikj"
          width={1020}
          height={250}
          objectFit='contain'
          
          />
           <div className="flex flex-col p-5 space-y-10 bg-white">
          <h1 className="text-3xl border-b pb-4">
            {items.length===0 
            ? "Your Bharify Cart is Empty"
            :"Shopping Cart" }
          </h1>
          {items.map((item,i)=>(
            <CheckoutProduct
            key={i}
            id={item.id}
            title={item.title}
            rating={item.rating}
            description={item.description}
            price={item.price}
            category={item.category}
            image={item.image}
            hasPrime={item.hasPrime}
            />
          ))}
        </div>
        </div>
       


        {/* Right part of Page */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length>0 && (
            <>
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">
              <CurrencyFormat  price={total} />
              </span>
            </h2>
            <button 
            onClick={createCheckoutSession}
            role='link'
            disabled={!session}
            className={`button mt-2 ${!session &&
            "from-gray-300 to-gray-500 border-gray-200 text-black-300 font-bold cursor-not-allowed"}`}
            >
              {!session ? "Sign In To Checkout":"Proceed To Checkout"}
            </button>
            </>
          )}
        </div>

       </main>
    </div>
  )
}

export default Checkout
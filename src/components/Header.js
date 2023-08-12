import React from 'react';
import Image from "next/image";
import {
   MenuIcon,
   SearchIcon,
   ShoppingCartIcon,
} from "@heroicons/react/outline"
import {signIn,signOut,useSession} from "next-auth/react"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';

function Header() {
  const{data: session}=useSession();
  const router = useRouter();
  const items = useSelector(selectItems)
  
  return (
    <header>
        {/* Top nav */}
       <div className="flex items-center bg-bharatify_blue">
          <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
            <Image
            onClick={()=>router.push('/')}
            src="https://i.imgur.com/A08QIs7.png"
            width={170}
            height={70}
            objectFit="contain"
            className="cursor-pointer"
           
           
            />
          </div>
          {/* Search */}
          <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-300 hover:bg-yellow-500 ">
            <input 
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 "
            type="text" />
            <SearchIcon className="h-12 p-4 rounded-md  "/>
          </div>
          {/* Right Hand Side of Search */}
          <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
            <div onClick={!session?signIn:signOut}className=" link">
              <p className='font-serif'>
                {session ? (
              <Image
                src={session.user.image}
                width={40} // Adjust the width as needed
                height={40} // Adjust the height as needed
                alt="User Image"
                className='rounded-full ml-8'
              />
            ) : (
              "Sign In"
            )}
              </p>
              <p className="font-extrabold md:text-sm font-serif">Account & Lists</p>
            </div>
            <div className=" link">
              <p className='font-serif'>Returns</p>
              <p className="font-extrabold md:text-sm font-serif">& Orders</p>
            </div>
            <div onClick={()=>router.push("/checkout")} className="relative link flex items-center">
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {items.length}
                </span>
             <ShoppingCartIcon className='h-10'/>
             <p className=" hidden md:inline font-bold md:text-sm mt-2 font-serif">Basket</p>
            </div>
          </div>
       </div>
       {/* Bottom nav */}
       <div className="flex items-center space-x-3 p-1 pl-6 bg-bharatify_blue-light text-sm">
         <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1"/>
          All
         </p>
         <p className=" link">Prime Video</p>
         <p className=" link">Amazon Business</p>
         <p className=" link">Today's Deals</p>
         <p className="link hidden lg:inline-flex">Electronics</p>
         <p className="link hidden lg:inline-flex">Food & Grocery</p>
         <p className="link hidden lg:inline-flex">Prime</p>
         <p className="link hidden lg:inline-flex">Buy Again</p>
         <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
         <p className="link hidden lg:inline-flex">Health & Personal Care</p>
       </div>
    </header>
  )
}

export default Header
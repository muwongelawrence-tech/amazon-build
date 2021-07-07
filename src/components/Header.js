import React from 'react';
import Image from 'next/image';
import { MenuIcon, SearchIcon, ShoppingCartIcon} from "@heroicons/react/outline";
import {signIn , signOut , useSession} from 'next-auth/client';
import {useRouter} from 'next/router';
import { useSelector} from 'react-redux';
import { selectItems}  from '../slices/basketSlice';

const Header = () => {
    const [session] = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

    return ( 
        <header>
            {/* top nav */}
           <div className = "flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div onClick = { () => router.push('/')} classNmae = "mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                    src = "http://links.papareact.com/f90"
                    width = {150}
                    height = {40}
                    objectFit = "contain"
                    className = "cursor-pointer"
                    />
                </div>
                {/* search */}
                 <div className = 'hidden  sm:flex items-center h-10 rounded-md bg-yellow-400   hover:bg-yellow-500 flex-grow cursor-pointer'>
                     <input  className = "p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text"/>
                      <SearchIcon className = "h-12 p-4" />
                 </div>

                 {/* Right */}
                 <div className = "text-white flex items-center text-xs space-x-6 mx-6 whitespacenowrap">
                     <div onClick = {!session ? signIn : signOut} className = "link" >
                         <p>{ session ? `Hello ${session.user.name}`:"SignIn"}</p>
                         <p className = "font-extrabold md:text-sm">Account & Lists </p>
                     </div>
                     <div onClick ={() => session && router.push("/orders")} className = "cursor-pointer link" >
                         <p>Returns</p>
                         <p className = "font-extrabold md:text-sm">Orders</p>
                     </div>
                     <div onClick = { () => router.push('/checkout')} className = " relative link flex items-center" >
                         <span className = "absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold" >
                             {items.length}
                         </span>
                         <ShoppingCartIcon className = "h-10"/>
                         <p className = "hidden md:inline font-extrabold md:text-sm mt-2">Cart</p>
                     </div>
                 </div>
        

           </div>

           {/* bottom nav */}
           <div className = "flex items-center p-2 pl-6 space-x-3 bg-amazon_blue-light text-white text-sm">
            <p className = "link flex items-center ">
                <MenuIcon className = "h-6 mr-1" />
                All
            </p>
            <p className = "link ">Prime video</p>
            <p className = "link "> Amazon deals</p>
            <p className = "link ">Todays Deals </p>
            <p className = "link hidden lg:inline-flex">Electronics </p>
            <p className = "link hidden lg:inline-flex">Food  & Grocery </p>
            <p className = "link hidden lg:inline-flex">Prime </p>
            <p className = "link hidden lg:inline-flex">Buy Again</p>
            <p className = "link hidden lg:inline-flex">Shopper Toolkit </p>
            <p className = "link hidden lg:inline-flex">Health & Personal Care </p>
           </div>

        </header>
     );
}
 
export default Header;
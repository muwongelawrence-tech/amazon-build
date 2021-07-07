import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import { useSelector} from 'react-redux';
import { selectItems}  from '../slices/basketSlice';
import { selectTotal }  from '../slices/basketSlice';
import CheckOutProducts from '../components/CheckOutProducts';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key);

const CheckOut = () => {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const [session] = useSession();

     const createCheckoutSession = async () => {
         const stripe = await stripePromise;
         // call a backend to create a checkout session.
        const checkoutSession = await axios.post('/api/check-out-session',{
            items : items,
            email : session.user.email
        });
        // font-end receives   back the id then we redirect the user to the checkout page.
        const result = await stripe.redirectToCheckout({
          sessionId : checkoutSession.data.id
        });

        if(result.error) alert(result.error.messgae);
        
    };

    return ( 
        <div className = "bg-gray-100">
           <Header/>
           <main className ="lg:flex max-w-screen-2xl mx-auto">
               {/* left */}
              <div className = "flex-grow m-5 shadow-sm">
               <Image
               src = "/ck.jpg"
               width = {1020}
               height = {250}
               objectFit = "contain"
               />
               <div className = "flex flex-col p-5 space-y-10 bg-white">
                   <h1 className = "text-3xl border-b pb-4">
                     {items.length === 0 ? "Your Cart is empty" : " Your Shopping Cart"}
                    </h1>
                    { items.map((item, i) => (
                       <CheckOutProducts
                       key = {i}
                       id = {item.id}
                       title = {item.title}
                       rating = {item.rating}
                       price = {item.price}
                       description = {item.description}
                       category = {item.category}
                       image = {item.image}
                       hasPrime = {item.hasPrime}
                        /> 
                    ))}
               </div>
              </div>


               {/* Right */}
               <div className = "flex flex-col bg-white p-10 shadow-md">
              { items.length > 0 && (
                  <>
                 <h2 className = "whitespace-nowrap">
                     Subtotal ({items.length} items):
                     <span className = "font-bold">
                      <Currency  quantity = {total}  currency = "GBP"/> 
                     </span>
                 </h2>
                 <button role="link" 
                  onClick = {createCheckoutSession}
                  disabled = {!session} className = {`${!session ? 'button2 rounded-sm mt-2 cursor-not-allowed ' :"button rounded-sm mt-2"} ` }>
                     {!session ? "Sign in to Checkout" : "Proceed to checkout"} 
                 </button>
                  </>
              )}
               </div>

           </main>
        </div>
     );
}
 
export default CheckOut;
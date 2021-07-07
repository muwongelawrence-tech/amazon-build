import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket} from '../slices/basketSlice';
import { removeFromBasket} from '../slices/basketSlice';

const CheckOutProducts = ({id,title,price,description,category,image,rating,hasPrime}) => {
    const dispatch = useDispatch();


    const addItemToCart = () => {
        const product = {id,title,price,description,category,image,rating,hasPrime};
        // sending the product as an action to the Redux store.
        dispatch(addToBasket(product));
       };

       const removeItemFromCart = () => {
         const product = {id};
        // sending the product as an action to the Redux store.
        dispatch(removeFromBasket(product));
       };
       

    return ( 
        <div className = "grid grid-cols-5">
             <Image src = {image} height ={200} width = {200} objectFit = "contain"/>

             {/* Middle */}
             <div className = "col-span-3 mx-5">
                 <p>{category}</p>
                 <p>{title}</p>

                 <div className = "flex">
                     { Array(rating).fill().map((_ , i) => (
                       <StarIcon className = "h-5 text-yellow-500"/>
                    ))}
                 </div>  
                <p className = "text-xs my-2 line-clamp-3">{description}</p>
                <Currency  quantity = {price}  currency = "GBP"/>

                {
               hasPrime && (<div className = "flex items-center space-x-2 ">
                   <img loading = "lazy" className = "w-12" src="https://links.papareact.com/fdw" alt=""/>
                   <p className ="text-xs text-gray-500">FREE  free-next day delivery</p>
               </div>)
           }
           
           </div>
           {/* right add and delete buttons */}
           <div className = "flex flex-col space-y-2 my-auto justify-self-end">
           < button onClick = {addItemToCart} className = "button rounded-sm">Add to Cart</button>
           < button  onClick = {removeItemFromCart} className = "button rounded-sm">Remove from Cart</button>
           </div>

         

        </div>
     );
}
 
export default CheckOutProducts;
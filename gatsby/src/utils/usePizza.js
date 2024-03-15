import { useState } from "react";

export default function usePizza({ pizzas, inputs }) {
   // 1. Create some state to hold our order
   // We got rid of this line because we moved useState up to the provider
   // const [order, setOrder] = useState([]);
   // We got rid of this line because we moved useState up to the provider
   // const [error, setError] = useState();
   // We got rid of this line because we moved useState up to the provider
   // const [loading, setLoading] = useState(false);
   // We got rid of this line because we moved useState up to the provider
   // const [message, setMessage] = useState('');
   const [order, setOrder] = useState([]);
   const [error, setError] = useState();
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');
   // 2. Make a function to add things to order
   function addToOrder(orderedPizza) {
      setOrder([...order, orderedPizza]);
   }
   // 3. Make a function to remove things from order
   function removeFromOrder(index) {
      setOrder([
         // everything before the item we want to remove and give example for removing the first item by comment out the line below
          ...order.slice(0, index),
         // everything after the item we want to remove
         ...order.slice(index + 1),
          // input: [1, 2, 3, 4, 5]
            // order.slice(0, 1) => [1]
            // order.slice(2) => [3, 4, 5]
            // [1, 3, 4, 5]
      ]);
   }
   // 4. Send this data to a serverless function when they check out
   // 5. Set up loading, error, and success states
   return {
      order,
      addToOrder,
      removeFromOrder,
      error,
      loading,
      message,
   };
}
import { useState } from "react";
import { useOrder } from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import formatMoney from "./formatMoney";
import calculateOrderTotal from "./calculateOrderTotal";

export default function usePizza({  pizzas, inputs }) {
   // 1. Create some state to hold our order
   // We got rid of this line because we moved useState up to the provider
   // const [order, setOrder] = useState([]);
   // We got rid of this line because we moved useState up to the provider
   // const [error, setError] = useState();
   // We got rid of this line because we moved useState up to the provider
   // const [loading, setLoading] = useState(false);
   // We got rid of this line because we moved useState up to the provider
   // const [message, setMessage] = useState('');
   // const [order, setOrder] = useState([]);

  const { order, setOrder } = useOrder();
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

   // make submit order function
   async function submitOrder(e) {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setMessage(null);
      // gather all the data
      const body = {
         order: attachNamesAndPrices(order, pizzas),
         total: formatMoney(calculateOrderTotal(order, pizzas)),
         name: inputs.name,
         email: inputs.email,
      };
      // 4. Send this data the a serevrless function when they check out
      const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(body),
      });
      const text = JSON.parse(await res.text());
      // check if everything worked
      if (res.status >= 400 && res.status < 600) {
         setLoading(false);
         setError(text.message);
      } else {
         setLoading(false);
         setMessage("Success! Come on down for your pizza");
      }
   }
   return {
      order,
      addToOrder,
      removeFromOrder,
      error,
      loading,
      message,
      submitOrder,
   };
}
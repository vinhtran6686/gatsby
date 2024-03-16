import React, { useState } from 'react';

// create order context
const OrderContext = React.createContext();

// create a provider
function OrderProvider({ children }) {
  // Move the order state to this context
  const [order, setOrder] = useState([]);

  // Make a function to add things to the order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };

  // Make a function to remove things from the order
  const removeFromOrder = (index) => {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  };

  const contextValues = {
    order,
    setOrder,
    addToOrder,
    removeFromOrder,
  };

  return (
    <OrderContext.Provider value={contextValues}>
      {children}
    </OrderContext.Provider>
  );
}

// create a consumer
function useOrder() {
  return React.useContext(OrderContext);
}

// export all three in a single line
export { OrderProvider, OrderContext, useOrder };
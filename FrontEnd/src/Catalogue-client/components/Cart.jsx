import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Accedemos al array de cartItems que fue enviado a través del estado
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems); // Actualizamos el estado con los items
    }
  }, [location.state]); // Aseguramos que esto se ejecute solo cuando location.state cambie

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <ul>
        {cartItems.length === 0 ? (
          <li>El carrito está vacío.</li>
        ) : (
          cartItems.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;


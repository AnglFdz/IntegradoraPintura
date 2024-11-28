import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Cart = (props) => {
  // Recibimos los items del carrito a través de las props
  const { items } = props;
  const [cartItems, setCartItems] = useState(items); // Inicializamos el estado con los items pasados

  useEffect(() => {
    // Si los ítems de carrito cambian, actualizamos el estado
    if (items.length > 0) {
      setCartItems(items);

    }
  }, [items]); // Se ejecuta cada vez que los items cambian

  return (
    <div>
      <div className="p-card p-3 shadow-2 border-round surface-0 mt-2" style={{ maxHeight: '700px', overflowY: 'auto' }}>
        {cartItems.length === 0 ? (
          <h1>El carrito esta Vacio</h1>
        ) : (
          cartItems.map((item, index) => (
            <div className="p-card my-1 p-3 shadow-2 border-round surface-0 " key={index}>
              <div className="flex align-items-center gap-3">
                <img src={item.image} alt="Placeholder" className="border-round" style={{ width: '150px', height: '150px', objectFit: 'cover', }} />
                <div className="flex md:justify-content-between align-items-center flex-grow-1">
                  <h2 className="text-xl font-bold my-2">{item.title}</h2>
                  <p className="text-secondary my-2">This is a description inside the card. You can add more details here.</p>
                  <button className="p-button p-button-primary mx-2">Eliminar</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;


import React, { useState, useEffect } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

const Cart = (props) => {
  const { items } = props;
  const [cartItems, setCartItems] = useState(items);

  useEffect(() => {
    if (items.length > 0) {
      setCartItems(items.map(item => ({ ...item, cantidad: 1 })));
    }
  }, [items]);

  const handleRemoveItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
  };

  const calculoPrecio = (value, index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].cantidad = Math.min(value, updatedCartItems[index].stock);
    setCartItems(updatedCartItems);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.cantidad * item.price,
    0
  );

  return (
    <div className="grid">

      <div className="col-12 md:col-7 lg:col-8">
        <div className="mt-2 h-4rem border-round flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--blue-900)', color: 'var(--primary-color-text)' }}>
          <h1 className="font-bold ">Productos</h1>
        </div>
        <div className="p-card p-3 shadow-2 border-round surface-0 mt-2" style={{ maxHeight: '700px', overflowY: 'auto' }}>
          {cartItems.length === 0 ? (
            <div className="flex flex-column align-items-center justify-content-center h-15rem" style={{ color: "#6c757d", textAlign: "center" }}>
              <i className="pi pi-shopping-cart" style={{ fontSize: "4rem", color: "#ced4da", marginBottom: "1rem" }}></i>
              <h2 className="font-bold text-xl">Tu carrito está vacío</h2>
              <p style={{ fontSize: "1rem", color: "#6c757d" }}>
                ¡Agrega algunos productos para comenzar a comprar!
              </p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div className="p-card my-1 p-3 shadow-2 border-round surface-0 " key={index}>
                <div className="flex align-items-center gap-3">
                  <img src={item.image} alt="Placeholder" className="border-round" style={{ width: '150px', height: '150px', objectFit: 'cover', }} />
                  <div className="flex md:justify-content-between align-items-center flex-grow-1">
                    <div>
                    <h2 className="text-xl font-bold my-2 text-5xl font-bold">{item.title}</h2>
                    <p className="text-secondary" >This is a description inside the card. You can add more details here.</p>
                    </div>
                    <div>
                      <p className="text-secondary my-2 text-md italic text-primary-700">Precio unitario: ${item.price.toFixed(2)}</p>
                      <p className="text-secondary my-2 text-md italic text-primary-700">Stock disponible: {item.stock}</p>
                    </div>
                    <InputNumber inputId="stacked-buttons" value={item.cantidad} onValueChange={(e) => calculoPrecio(e.value, index)} showButtons min={1} max={item.stock} />
                    <Button className="p-button p-button-primary mx-2" icon="pi pi-times" onClick={() => handleRemoveItem(index)} style={{ backgroundColor: "var(--red-500)", borderBlockColor: "var(--red-500)" }} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>

        </div>
      </div>

      <div className="col-12 md:col-5 lg:col-4">
        <div className="mt-2 h-4rem border-round flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--blue-900)', color: 'var(--primary-color-text)' }}>
          <h1 className="font-bold">Entrega</h1>
        </div>
        <div>

          <div className="p-card mt-2 shadow-4 border-round surface-card p-4 flex flex-column align-items-center justify-content-center">
            <h2 className="text-2xl font-bold text-secondary-700 mb-2">
              Total de tu compra
            </h2>
            <div
              className="shadow-2 border-round p-3 flex align-items-center justify-content-center"style={{ background: "var(--blue-900)",color: "#fff",fontSize: "2.5rem",fontWeight: "bold",width: "100%",textAlign: "center",}}>
              ${total.toFixed(2)}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Cart;


import React, { useState, useEffect } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import { setOrder } from "../../access-control/utils/useMethods";
import { getData } from "../../access-control/utils/useMethods";

const Cart = (props) => {
  const { items } = props;
  const [cartItems, setCartItems] = useState(items || []);
  const [numIdentificador, setNumIdentificador] = useState(""); // Nuevo estado para el número identificador
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const id_usuario = getData("id"); 
  const id_role = getData("role");

  useEffect(() => {
    if (items.length > 0) {
      setCartItems(
        items.map((item) => ({
          ...item,
          cantidad: item.cantidad || 1, // Asegura una cantidad mínima
        }))
      );
    }
  }, [items]);
  

  // Actualizar cantidad de un producto
  const handleUpdateCantidad = (value, index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].cantidad = Math.min(value, updatedCartItems[index].stock);
    setCartItems(updatedCartItems);
  };

  // Remover un producto del carrito
  const handleRemoveItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
  };

  // Calcular el total del carrito
  const total = cartItems.reduce(
    (sum, item) => sum + item.cantidad * item.precio,
    0
  );

  // Enviar pedido
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!id_usuario || !id_role) {
      setError("No se pudo obtener la información del usuario.");
      setLoading(false);
      return;
    }

    if (!numIdentificador.trim()) {
      setError("Debe ingresar un número identificador válido para continuar.");
      setLoading(false);
      return;
    }

    const data = {
      numidentificador: numIdentificador.trim(),
      total: total,
      id_usuario: id_usuario,
      id_role: id_role,
    };

    try {
      const response = await setOrder({ data });
      if (response) {
        setSuccess("Pedido enviado con éxito.");
        console.log("Respuesta del servidor:", response);
      } else {
        setError("Hubo un error al enviar el pedido.");
      }
    } catch (error) {
      setError("Hubo un error al enviar el pedido.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid">
      {/* Sección de productos */}
      <div className="col-12 md:col-7 lg:col-8">
        <div className="mt-2 h-4rem border-round flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--blue-900)', color: 'var(--primary-color-text)' }}>
          <h1 className="font-bold">Productos</h1>
        </div>
        <div className="p-card p-3 shadow-2 border-round surface-0 mt-2" style={{ maxHeight: '700px', overflowY: 'auto' }}>
          {cartItems.length === 0 ? (
            <div className="flex flex-column align-items-center justify-content-center h-15rem" style={{ color: "#6c757d", textAlign: "center" }}>
              <i className="pi pi-shopping-cart" style={{ fontSize: "4rem", color: "#ced4da", marginBottom: "1rem" }}></i>
              <h2 className="font-bold text-xl">Tu carrito está vacío</h2>
              <p style={{ fontSize: "1rem", color: "#6c757d" }}>¡Agrega algunos productos para comenzar a comprar!</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div className="p-card my-1 p-3 shadow-2 border-round surface-0 " key={index}>
                <div className="flex align-items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.nombre}
                    className="border-round"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <div className="flex md:justify-content-between align-items-center flex-grow-1">
                    <div>
                      <h2 className="text-xl font-bold my-2">{item.nombre}</h2>
                      <p className="text-secondary">{item.descripcion}</p>
                    </div>
                    <div>
                      <p className="text-secondary my-2 italic text-primary-700">Precio unitario: ${item.precio.toFixed(2)}</p>
                      <p className="text-secondary my-2 italic text-primary-700">Stock disponible: {item.stock}</p>
                    </div>
                    <InputNumber
                      value={item.cantidad}
                      onValueChange={(e) => handleUpdateCantidad(e.value, index)}
                      showButtons
                      min={1}
                      max={item.stock}
                    />
                    <Button
                      className="p-button p-button-primary mx-2"
                      icon="pi pi-times"
                      onClick={() => handleRemoveItem(index)}
                      style={{ backgroundColor: "var(--red-500)", borderColor: "var(--red-500)" }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sección de entrega */}
      <div className="col-12 md:col-5 lg:col-4">
        <div className="mt-2 h-4rem border-round flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--blue-900)', color: 'var(--primary-color-text)' }}>
          <h1 className="font-bold">Entrega</h1>
        </div>
        <div className="p-card mt-2 shadow-4 border-round surface-card p-4 flex flex-column align-items-center justify-content-center">
          <h2 className="text-2xl font-bold text-secondary-700 mb-2">Número Identificador</h2>
          <InputText
            value={numIdentificador}
            onChange={(e) => setNumIdentificador(e.target.value)}
            placeholder="Ingrese el número identificador"
            className="w-full mb-3"
          />
          <h2 className="text-2xl font-bold text-secondary-700 mb-2">Total de tu compra</h2>
          <div className="w-full shadow-2 border-round p-3 flex align-items-center justify-content-center" style={{ background: "var(--blue-900)", color: "#fff", fontSize: "2.5rem", fontWeight: "bold" }}>
            ${total.toFixed(2)}
          </div>
          <Button
            label={loading ? "Procesando..." : "Finalizar Compra"}
            icon="pi pi-check"
            className="w-full mt-3"
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0 || !numIdentificador.trim()}
          />
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginTop: '1rem' }}>{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;

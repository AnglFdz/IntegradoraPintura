import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import ItemsList from './ItemsList';

function ListProducts() {
    const styleHeader = 'bg-blue-600 text-bluegray-50 border-round-xl flex justify-content-center';
    const [productosCarrito, setProductosCarrito] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    const obtenerProductosCarrito = (product) => {
        setProductosCarrito((prevProductos) => {
          // Buscar el índice del producto en el carrito
          const existingProductIndex = prevProductos.findIndex(
            (item) => item.id_producto === product.id_producto
          );
      
          if (existingProductIndex !== -1) {
            // Si el producto ya existe, incrementamos la cantidad de manera segura
            return prevProductos.map((item, index) => {
              if (index === existingProductIndex && item.stock > item.cantidad) {
                return { ...item, cantidad: item.cantidad + 1 }; // Crear una copia del producto con cantidad actualizada
              }
              return item; // Devolver los demás productos sin cambios
            });
          } else {
            // Si el producto no existe, lo agregamos con cantidad inicial 1
            return [...prevProductos, { ...product, cantidad: 1 }];
          }
        });
      };

      const deleteProduct = (product) => {
        setProductosCarrito((prevProductos) => {
            const existingProductIndex = prevProductos.findIndex(
              (item) => item.id_producto === product
            );
        
            if (existingProductIndex !== -1) {
              // Crear una copia del arreglo
              const updatedProductos = [...prevProductos];
              const productToUpdate = { ...updatedProductos[existingProductIndex] };
        
              if (productToUpdate.cantidad > 1) {
                // Reducir la cantidad si es mayor a 1
                productToUpdate.cantidad -= 1;
                updatedProductos[existingProductIndex] = productToUpdate; // Actualizamos el producto
              } else {
                // Eliminar el producto si la cantidad llega a 0
                updatedProductos.splice(existingProductIndex, 1);
              }
        
              return updatedProductos; // Retornamos el arreglo actualizado
            }
            return prevProductos; // Si no se encuentra el producto, retornamos el estado actual
          });
      };
      

    useEffect(() => {
        setIsMounted(true);
    }, []);
    useEffect(() => {   
        if(isMounted){
        }
    }, [isMounted, productosCarrito]);
    return (
        <>
            <div className="flex flex-row w-full">
                <div className={`${styleHeader} col-8`}>
                    <h2>Productos</h2>
                </div>
                <div className={`${styleHeader} col-4`}>
                    <h2>Carritos</h2>
                </div>
            </div>

            <div className="grid mt-2 h-full">
                <div className="col-8">
                    <ItemsList page='employee' products={obtenerProductosCarrito} />
                </div>
                <div className="col-4">
                    <Cart products={productosCarrito} remove={deleteProduct} />
                </div>
            </div>
        </>
    )
}

export default ListProducts
import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import CardPrime from "./components/Card";
import Cart from "./components/Cart";
import "primeicons/primeicons.css";
import { getProducts } from "../access-control/utils/useMethods";

const Catalogue = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInVisible, setInVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [activated, setActivated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(); 
        setProducts(fetchedProducts);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const items = [
    {
      label: "Catalogo",
      icon: "pi pi-shopping-bag",
      command: () => {
        setSelectedCategory("All"); // Mostrar todos los productos
      },
    },
    {
      label: "Categorias",
      icon: "pi pi-sliders-h",
      items: [
        {
          label: "Pinturas",
          icon: "pi pi-palette",
          items: [
            {
              label: "Interiores",
              command: () => setSelectedCategory("Interiores"), // Filtrar por interiores
            },
            {
              label: "Exteriores",
              command: () => setSelectedCategory("Exteriores"), // Filtrar por exteriores
            },
            {
              label: "Especializada",
              command: () => setSelectedCategory("Especializada"), // Filtrar por especializada
            },
          ],
        },
        {
          label: "Materiales de Pintura",
          icon: "pi pi-objects-column",
          command: () => setSelectedCategory("Materiales"), // Filtrar por materiales
        },
      ],
    },
    {
      label: `Carrito ${cartCount > 0 ? cartCount : ""}`,
      icon: "pi pi-shopping-cart",
      command: () => {
        if (!activated) {
          setIsVisible(!isVisible);
          setInVisible(!isInVisible);
          setActivated(true);
        }
      },
    },
  ];

  const endElement = (
    <Button
      label=""
      icon="pi pi-sign-out"
      className="p-button-secondary"
      style={{
        backgroundColor: "var(--primary-300)",
        borderColor: "var(--primary-300)",
        color: "var(--primary-color-text)",
      }}
    />
  );

  const cart_items = [];

  function insert_items_cart(item) {
    cart_items.push(item);
    setCartCount(cartCount + 1);
    setCartItems((prevItems) => [...prevItems, item]);
  }

  // Filtrar los productos según la categoría seleccionada
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.categoria === selectedCategory);

  return (
    <div>
      {/* Menu */}
      <Menubar
        model={items}
        end={endElement}
        className="my-2"
        style={{
          backgroundColor: "var(--primary-300)",
          color: "var(--primary-color-text)",
          items: "var(--surface-0)",
        }}
      />
      {/* Cards */}
      <div className={isInVisible ? "grid" : "hidden"}>
        {filteredProducts.map((card) => (
          <div
            key={card.id_producto}
            className="col-12 flex align-items-center justify-content-center md:col-6 lg:col-3 "
          >
            <CardPrime
              title={card.nombre}
              description={card.descripcion}
              image={card.imagen}
              stock={card.stock}
              footer={card.categoria}
              onAction={() => insert_items_cart(card)}
            />
          </div>
        ))}
      </div>

      <div className={isVisible ? "" : "hidden"}>
        <Cart items={cartItems}></Cart>
      </div>
    </div>
  );
};

export default Catalogue;

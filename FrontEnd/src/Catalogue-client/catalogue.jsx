import React, { useState,useEffect } from "react";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        if (productsData) {
          setProducts(productsData);  
        } else {
          setError("No se pudieron cargar los productos");  
        }
      } catch (error) { 
        console.log(error)
      }  
    };
    fetchProducts();  
  }, []);
  const items = [
    {
      label: "Catalogo",
      icon: "pi pi-shopping-bag",
      command: () => {
        console.log("Home clicked");
      },
    },
    {
      label: "Categorias",
      icon: "pi pi-sliders-h",
      command: () => {
        console.log("About clicked");
      },
      items: [
        {
          label: "Pinturas",
          icon: "pi pi-palette",
          items: [
            {
              label: "Anti-bacterial",
            },
            {
              label: "Acrilica",
            },
            {
              label: "Vinilada",
            },
            {
              label: "Cromatica",
            },
            {
              label: "Aerosol",
            },
          ],
        },
        {
          label: "Material de Pintura",
          icon: "pi pi-objects-column",
          items: [
            {
              label: "Brochas",
            },
            {
              label: "Rodillos",
            },
            {
              label: "Cintas",
            },
            {
              label: "Guantes y Mascaras",
            },
          ],
        },
      ],
    },
    {
      label: `Carrito ${cartCount > 0 ? cartCount : ""}`,
      icon: "pi pi-shopping-cart",
      command: () => {
        if (!activated) {
          setIsVisible(!isVisible)
          setInVisible(!isInVisible)
          setActivated(true);
        }
      },
    },
  ];
  const endElement = <Button label="" icon="pi pi-sign-out" className="p-button-secondary" style={{ backgroundColor: 'var(--primary-300)', borderColor: 'var(--primary-300)', color: 'var(--surface-0)', }} />;

  const cart_items = []

  function insert_items_cart(item) {
    cart_items.push(item)
    setCartCount(cartCount + 1);
    setCartItems((prevItems) => [...prevItems, item]);
  }


  return (
    <div>
      {/* Menu */}
      <Menubar model={items} end={endElement} className="my-2" style={{ backgroundColor: 'var(--primary-300)', color: 'var(--primary-color-text)', items: 'var(--surface-0)' }} />
      {/* Cards */}
      <div className={isInVisible ? 'grid' : 'hidden'}>
        {products.map((card) => (
          <div key={card.id_producto} className="col-12 flex align-items-center justify-content-center md:col-6 lg:col-3 ">
            <CardPrime
              title={card.nombre}
              description={card.descripcion}
              image={card.imagen}
              stock={card.stock}

              onAction={() => insert_items_cart(card)}
            />
          </div>
        ))}
      </div>

      <div className={isVisible ? '' : 'hidden'}>
        <Cart items={cartItems} ></Cart>
      </div>
    </div>
  );
};

export default Catalogue;
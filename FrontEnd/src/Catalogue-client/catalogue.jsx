import React,{useState} from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import  CardPrime  from "./components/Card";
import "primeicons/primeicons.css";

const Catalogue = () => {
  const [cartCount, setCartCount] = useState(0);
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
        console.log("Contact clicked");
      },
    },
  ];
  const cardData = [
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card.",
      image: "https://i.pinimg.com/736x/91/3b/b5/913bb5ba246e0f4ae2a7e7b97aecb7e2.jpg",
      stock: 12
    },
    {
      id: 2,
      title: "Card 2",
      description: "This is the second card.",
      image: "https://i.pinimg.com/736x/15/da/f5/15daf568c0f4f004c9847203800eeadf.jpg",
      stock: 12
    },
    {
      id: 3,
      title: "Card 3",
      description: "This is the third card.",
      image: "https://i.pinimg.com/736x/06/35/19/0635199fc09754bea87dbbc15722e901.jpg",
      stock: 12
    },
    {
      id: 4,
      title: "Card 4",
      description: "This is the forth card.",
      image: "https://i.pinimg.com/736x/88/d1/1a/88d11a31a1ecd5e3bc04dcdaa02b2e24.jpg",
      stock: 12
    },
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card.",
      image: "https://i.pinimg.com/736x/d0/e1/bf/d0e1bf9b7859f421460969b33c73686b.jpg",
      stock: 12
    },
    {
      id: 2,
      title: "Card 2",
      description: "This is the second card.",
      image: "https://i.pinimg.com/736x/97/49/98/974998cc07764ba374fbe3ada03345ab.jpg",
      stock: 12
    },
    {
      id: 3,
      title: "Card 3",
      description: "This is the third card.",
      image: "https://i.pinimg.com/736x/36/e0/67/36e06701e26a017496fc1009cf24d92b.jpg",
      stock: 12
    },
    {
      id: 4,
      title: "Card 4",
      description: "This is the forth card.",
      image: "https://i.pinimg.com/736x/f1/75/24/f17524202ca5612c81c2c7304389a1d1.jpg",
      stock: 0
    },
  ];
  const endElement = <Button label="" icon="pi pi-arrow-circle-left" className="p-button-secondary" style={{backgroundColor:'var(--primary-300)',borderColor:'var(--primary-300)',color:'var(--surface-0)',}} />;

  const cart_items = []
 
  function insert_items_cart(item){
    cart_items.push(item)
    setCartCount(cartCount + 1);
  }
  
  return (
    <div>
      {/* Menu */}
      <Menubar model={items} end={endElement} className="my-2" style={{backgroundColor:'var(--primary-300)',color:'var(--primary-color-text)',items:'var(--surface-0)'}} />
      {/* Cards */}   
      <div className="grid">
        {cardData.map((card) => (
          <div key={card.id} className="col-12 flex align-items-center justify-content-center md:col-6 lg:col-3 ">
            <CardPrime 
              title={card.title}
              description={card.description}
              image={card.image}
              stock={card.stock}
              onAction={() => insert_items_cart(card.title.toString())}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
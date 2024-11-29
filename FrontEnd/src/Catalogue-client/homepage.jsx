import React from "react";
import { Menubar } from "primereact/menubar";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import 'primereact/resources/themes/saga-blue/theme.css';  // Cambia el tema si lo deseas
import 'primereact/resources/primereact.min.css';
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

const Homepage = () => {
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
      label: "Carrito",
      icon: "pi pi-shopping-cart",
      command: () => {
        console.log("Contact clicked");
      },
    },
  ];
  const endElement = <Button label="" icon="pi pi-sign-out" className="p-button-secondary" style={{backgroundColor:'var(--primary-300)',borderColor:'var(--primary-300)',color:'var(--surface-0)',}} />;
  const headerI = (
    <img 
        alt="Card Image" 
        src="https://i.pinimg.com/736x/54/23/92/542392bda44770e8ee00b533fc999d80.jpg" 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
    />
  );
  const headerE = (
    <img 
        alt="Card Image" 
        src="https://i.pinimg.com/736x/30/e8/c8/30e8c8e51651b63bce0dba721ca7385e.jpg" 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
    />
  );
  const headerM = (
    <img 
        alt="Card Image" 
        src="https://i.pinimg.com/736x/8d/bf/63/8dbf63b55933909fbc54d0f313ec6664.jpg" 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
    />
  );
  const headerEs = (
    <img 
        alt="Card Image" 
        src="https://i.pinimg.com/736x/72/73/7a/72737a14889973078725a7f66f1d0984.jpg" 
        style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
    />
  );


  return (
    <div>
      {/* Menu */}
      <Menubar model={items} end={endElement} className="my-2" style={{backgroundColor:'var(--primary-300)',color:'var(--primary-color-text)',items:'var(--surface-0)'}} />
      {/* Cards */}
      <div className="p-grid p-dir-col">
            {/* Primera fila: 3 cards con col-4 */}
            <div className="grid">
                <div className="col-12 md:col-4 lg:col-4 ">
                    <Card header={headerI} title="Interiores"/>
                </div>
                <div className="col-12 md:col-4 lg:col-4">
                    <Card header={headerE} title="Exteriores"/>
                </div>
                <div className="col-12 md:col-4 lg:col-4 ">
                    <Card header={headerM} title="Materiales"/>
                </div>
            </div>

            {/* Segunda fila: 1 card con col-12 */}
            <div className="p-grid">
                <div className="p-col-12">
                    <Card header={headerEs} title="Especializada"/>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Homepage;

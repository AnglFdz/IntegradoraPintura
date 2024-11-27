import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import 'primereact/resources/themes/saga-blue/theme.css';  // Cambia el tema si lo deseas
import 'primereact/resources/primereact.min.css';
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

const Orderpage = () => {
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
    const endElement = <Button label="" icon="pi pi-arrow-circle-left" className="p-button-secondary" style={{backgroundColor:'var(--primary-300)',borderColor:'var(--primary-300)',color:'var(--surface-0)',}} />;



    return (
        <div>
            <Menubar model={items} end={endElement} className="" style={{backgroundColor:'var(--primary-300)',color:'var(--primary-color-text)',items:'var(--surface-0)'}} />
            <div className="grid">
                <div className="col-12 md:col-7 lg:col-8">
                    <div className="mt-2 h-4rem border-round flex align-items-center justify-content-center" style={{backgroundColor:'var(--blue-900)',color:'var(--primary-color-text)'}}>
                        <h1 className="font-bold ">Productos</h1>
                    </div>

                </div>
                <div className="col-12 md:col-5 lg:col-4">
                <div className="mt-2 h-4rem border-round flex align-items-center justify-content-center" style={{backgroundColor:'var(--blue-900)',color:'var(--primary-color-text)'}}>
                        <h1 className="font-bold">Entrega</h1>
                    </div>
                </div>
            </div>



        </div>
      );
  
};

export default Orderpage;

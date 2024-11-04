import React from 'react'
import { Menubar } from "primereact/menubar";

function NavBar({session}) {
    console.log(session ?? 'hola mundo')
    
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
    const customColors = {
        backgroundColor: "#0B1957",
        color: "white",
        border: "none",
    };
    const customSize = {
        max_width: "200px",
    };
    return (
        <>
            <Menubar model={items} style={customColors} className="my-2" />
        </>
    )
}

export default NavBar
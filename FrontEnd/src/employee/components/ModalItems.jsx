import React, { useState } from "react";
import ImageTest from "../../assets/prueba.png"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
        

function ModalItems(props){
    const {text} = props;
    const [visible, setVisible] = useState(false);
    const [showText, setShowText] = useState(text);
    const styleInputsTexts = 'w-full'

    return (
        <div className="">
            {showText === null || showText === undefined || showText === '' ?
            <Button icon="pi pi-pencil" className="p-button p-button-warning"  onClick={() => setVisible(true)} /> :
            <Button label={`${showText}`} onClick={() => setVisible(true)} />
            }
            <Dialog header={showText ? "Añadir producto":"Editar Producto"} visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <div className="grid">
                    <div className="flex justify-content-center col-12">
                        <img src={ImageTest} alt="" className="w-15rem" />
                    </div>
                    <div className="col-6">
                        <h3>Nombre</h3>
                        <InputText placeholder='Ingrese el precio del producto' className={styleInputsTexts} onChange={(e) => {}} />
                        <h3>Descripción</h3>
                        <InputTextarea placeholder='Ingrese la descripción del producto' className={styleInputsTexts} onChange={(e) => {}} />
                    </div>
                    <div className="col-6">
                        <h3>Precio</h3>
                        <InputText keyfilter={"num"} placeholder='Ingrese el precio del producto' className={styleInputsTexts} onChange={(e) => {}} />
                        <h3>Stock</h3>
                        <InputText keyfilter={"num"} placeholder='Ingrese el stock del producto' className={styleInputsTexts} onChange={(e) => {}} />
                    </div>
                    <div className="grid flex justify-content-end w-full">
                        <Button label="Cancelar" className="p-button-danger" onClick={() => setVisible(false)} />
                        <Button label="Guardar" className="p-button-success" onClick={() => setVisible(false)} />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ModalItems
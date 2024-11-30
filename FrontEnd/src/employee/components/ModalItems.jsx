import React, { useState } from "react";
import ImageTest from "../../assets/prueba.png"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { setProduct } from "../../access-control/utils/useMethods";
        

function ModalItems({text, product}){
    const [visible, setVisible] = useState(false);
    const [showText, setShowText] = useState(text);
    const [name, setName] = useState(product ? product.nombre : '');
    const [description, setDescription] = useState(product ? product.descripcion : '');
    const [price, setPrice] = useState(product ? product.precio : '');
    const [stock, setStock] = useState(product ? product.stock : '');
    const [image, setImage] = useState(product ? product.imagen : '');
    const [update, setUpdate] = useState(false);


    const saveProduct = async () => {
        const data = {
            nombre: name,
            descripcion: description,
            precio: price,
            stock: stock,
            imagen: null
        }
        await setProduct({data});
        setVisible(false);
    }

    const updateInfo =  () => {
        setUpdate(!update);
    }

    React.useEffect(() => {
        
    }, [update]);
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
                        <InputText placeholder='Ingrese el precio del producto' className={styleInputsTexts} value={name} onChange={(e) => {setName(e.target.value)}} />
                        <h3>Descripción</h3>
                        <InputTextarea placeholder='Ingrese la descripción del producto' className={styleInputsTexts} value={description} onChange={(e) => {setDescription(e.target.value)}} />
                    </div>
                    <div className="col-6">
                        <h3>Precio</h3>
                        <InputText keyfilter={"num"} placeholder='Ingrese el precio del producto' className={styleInputsTexts} value={price} onChange={(e) => {setPrice(e.target.value)}} />
                        <h3>Stock</h3>
                        <InputText keyfilter={"num"} placeholder='Ingrese el stock del producto' className={styleInputsTexts} value={stock} onChange={(e) => {setStock(e.target.value)}} />
                    </div>
                    <div className="col-12">
                        <h3>Imagen</h3>
                        <InputText type="file" placeholder='Ingrese la url de la imagen' className={styleInputsTexts} value={image} onChange={(e) => {setImage(e.target.value)}} />
                    </div>
                    <div className="grid flex justify-content-end w-full">
                        <Button label="Cancelar" className="p-button-danger" onClick={() => setVisible(false)} />
                        <Button label="Guardar" className="p-button-success" onClick={() => saveProduct()} />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ModalItems
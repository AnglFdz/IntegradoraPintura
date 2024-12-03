import React, { useState } from "react";
import ImageTest from "../../assets/prueba.png";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { setProduct, putProduct } from "../../access-control/utils/useMethods";

function ModalItems({ text, product, reload }) {
    
    const [visible, setVisible] = useState(false);
    const [showText, setShowText] = useState(text);
    const [name, setName] = useState(product ? product.nombre : "");
    const [description, setDescription] = useState(product ? product.descripcion : "");
    const [price, setPrice] = useState(product ? product.precio : "");
    const [stock, setStock] = useState(product ? product.stock : "");
    const [image, setImage] = useState(product ? product.imagen : "");
    const [imagePrev, setImagePrev] = useState("");
    const [category, setCategory] = useState(product ? product.categoria : "");


    const tratamentImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result);
        };
    }

    const saveProduct = async () => {
        const data = {
            nombre: name,
            descripcion: description,
            precio: price,
            categoria: category,
            stock: stock,
            imagen: image
        };     
        setVisible(false);   
        await setProduct({ data });
        reload();
    };

    const updateInfo = async () => {
        const data = {
            id: product.id_producto,
            nombre: name,
            descripcion: description,
            precio: price,
            categoria: category,
            stock: stock,
            imagen: image
        }
        console.log(data);        
        setVisible(false);
        await putProduct({ data });
        reload();
    };

    const validForm = () => {
        if (name === "" || description === "" || price === "" || stock === "" || image === "" || category === "") {
            return true;
        } else {
            return false;
        }
    }

    React.useEffect(() => {
        validForm();
    }, [name, description, price, stock, image, category]);

    React.useEffect(() => {     
    }, [reload, image]);

    const styleInputsTexts = "w-full";

    return (
        <div>
            {!showText ? (
                <Button
                    icon="pi pi-pencil"
                    className="p-button p-button-warning"
                    onClick={() => setVisible(true)}
                />
            ) : (
                <Button label={`${showText}`} onClick={() => setVisible(true)} />
            )}
            <Dialog
                header={!showText ? "Añadir producto" : "Editar Producto"}
                visible={visible}
                style={{ width: "50vw" }}
                onHide={() => setVisible(false)}
            >
                <div className="grid">
                    <div className="flex justify-content-center col-12">
                        <img
                            src={ text ? image != '' ? imagePrev : ImageTest : imagePrev ? imagePrev :`data:image/png;base64,${image}`  }
                            alt="Vista previa"
                            className="w-10rem"
                        />
                    </div>
                    <div className="col-6">
                        <h3>Nombre</h3>
                        <InputText
                        keyfilter={"alpha"}
                            placeholder="Ingrese el nombre del producto"
                            className={styleInputsTexts}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <h3>Descripción</h3>
                        <InputTextarea
                            keyfilter={"alphanum"}
                            placeholder="Ingrese la descripción del producto"
                            className={styleInputsTexts}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <h3>Precio</h3>
                        <InputText
                            keyfilter={"money"}
                            placeholder="Ingrese el precio del producto"
                            className={styleInputsTexts}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <h3>Stock</h3>
                        <InputText
                            keyfilter={"pint"}
                            placeholder="Ingrese el stock del producto"
                            className={styleInputsTexts}
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="col-6">
                        <h3>Imagen</h3>
                        <input
                            type="file"
                            className={`${styleInputsTexts} col-6`}
                            accept="image/*"
                            onChange={(e) => {setImage(e.target.files[0]); tratamentImage(e.target.files[0])}}
                        />
                    </div>
                    <div className="col-6">
                        <h3>Categoría</h3>
                        <Dropdown
                            optionLabel="name"
                            optionValue="name"
                            options={[
                                { name: "Interiores" },
                                { name: "Exteriores" },
                                { name: "Especializada" },
                                { name: "Cubeta de pintura" },
                            ]}
                            onChange={(e) => setCategory(e.value)}
                            placeholder= {category ? category : "Seleccione una categoría"}
                            className={styleInputsTexts}
                        />
                    </div>
                    <div className="grid flex justify-content-end w-full mt-4">
                        <Button
                            label="Cancelar"
                            className="p-button-danger mr-5"
                            onClick={() => setVisible(false)}
                        />
                        <Button
                            label="Guardar"
                            className="p-button-success"
                            disabled={validForm()}
                            onClick={() => (!showText ? updateInfo() : saveProduct())}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default ModalItems;

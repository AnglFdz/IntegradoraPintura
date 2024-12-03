import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getProducts, eliminateProduct } from '../../access-control/utils/useMethods';
import ModalItems from './ModalItems';

function ItemsList({page, products, filter, addProduct}) {

    const [productos, setProductos] = useState([]);
    const [pageLoad, setPageLoad] = useState(page);
    const [isMounted, setIsMounted] = useState(false);
    const [reload, setReload] = useState(false);

    const forcedReload = () => setReload(!reload);

    const obtenerProductos = async () => { 
        const response = await getProducts();
       setProductos(response);
    }

    const tratamentImage = (file) => {
        return (
            <img src={`data:image/png;base64,${file.imagen}`} alt="Imagen" style={{ width: '100px', height: '100px' }} />
        )
    }

    const agregarCarrito = (product) => {
        products(product);
    }

    const deleteProduct = async (product) =>  {
        await eliminateProduct({data: product});
        forcedReload();
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);
    useEffect(() => {
        obtenerProductos();
    }, [isMounted, reload, addProduct]);

    const button = (data) => {
        return (
            <>
                {pageLoad === 'employee' ?
                    <div className='flex justify-content-start'>
                        <Button icon="pi pi-shopping-cart" label='Agregar' className="border-round-xl" onClick={() => agregarCarrito(data)} disabled={!data.stock > 0} />
                    </div>
                    : pageLoad === 'employee/items' || pageLoad === 'admin' ?
                        <div className='grid'>
                            <ModalItems product={data} reload={forcedReload} />
                            <Button
                                icon="pi pi-trash"
                                className="p-button p-button-danger ml-3"
                                onClick={() => deleteProduct(data.id_producto)} />
                        </div> : null
                }
            </>
        )
    }
    return (
        <>
            <DataTable value={productos} scrollable globalFilter={filter} scrollHeight="40rem" tableStyle={{ minWidth: '40rem' }}>
                <Column field="id_producto" header="ID" ></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="precio" header="Precio"></Column>
                <Column field="categoria" header="Categoria"></Column>
                <Column field="stock" header="Unidades"></Column>
                <Column field={tratamentImage} header="Imagen"></Column>
                <Column field={button} header="Representative"></Column>
            </DataTable>
        </>
    )
}

export default ItemsList
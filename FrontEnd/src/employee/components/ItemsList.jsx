import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getProducts, eliminateProduct } from '../../access-control/utils/useMethods';
import ModalItems from './ModalItems';

function ItemsList({page, products}) {

    const [productos, setProductos] = useState([]);
    const [pageLoad, setPageLoad] = useState(page);
    const [isMounted, setIsMounted] = useState(false);
    const [reload, setReload] = useState(false);

    const obtenerProductos = async () => {
        const response = await getProducts();
        setProductos(response);
    }

    const agregarCarrito = (product) => {
        products(product);
    }

    const deleteProduct = async (product) =>  {
       await eliminateProduct({data: product});
       setReload(!reload)
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);
    useEffect(() => {
        obtenerProductos();
    }, [isMounted, reload]);

    const button = (data) => {
        return (
            <>
                {pageLoad === 'employee' ?
                    <div>
                        <button onClick={()=>agregarCarrito(data)} className='mr-3'>Agregar</button>
                    </div>
                    : pageLoad === 'employee/items' || pageLoad === 'admin' ?
                        <div className='grid'>
                            <ModalItems product={data} />
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
            <DataTable value={productos} scrollable scrollHeight="40rem" tableStyle={{ minWidth: '50rem' }}>
                <Column field="id_producto" header="ID" ></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="precio" header="Precio"></Column>
                <Column field="stock" header="Unidades"></Column>
                <Column field="imagen" header="Imagen"></Column>
                <Column field={button} header="Representative"></Column>
            </DataTable>
        </>
    )
}

export default ItemsList
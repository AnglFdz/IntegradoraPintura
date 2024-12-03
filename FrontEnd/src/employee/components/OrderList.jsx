import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getOrders } from '../../access-control/utils/useMethods';
import ModalVenta from './ModalVenta';

function OrderList({ page, filter, addProduct }) {
    const [productos, setProductos] = useState([]);
    const [pageLoad, setPageLoad] = useState(page);
    const [isMounted, setIsMounted] = useState(false);
    const [reload, setReload] = useState(false);
    const [show, setShow] = useState(false);
    const [venta, setVenta] = useState(null);

    const obtOrders = async () => {
        const response = await getOrders();
        setProductos(response);
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        obtOrders();
    }, [isMounted, reload, addProduct]);

    const button = (data) => {
        return (
            <div className="grid">
                <Button
                    icon="pi pi-eye"
                    className="p-button p-button-warning ml-3"
                    onClick={() => {
                        setVenta(data.ventas); 
                        setShow(true);
                    }}
                />
            </div>
        );
    };

    return (
        <>
            <ModalVenta show={show} setShow={setShow} venta={venta} />
            <DataTable
                value={productos}
                scrollable
                globalFilter={filter}
                scrollHeight="40rem"
                tableStyle={{ minWidth: '40rem' }}
            >
                <Column field="id" header="ID" />
                <Column field="numidentificador" header="Identificador Pedido" />
                <Column field="id_usuario" header="ID Usuario" />
                <Column body={button} header="Venta" />
            </DataTable>
        </>
    );
}

export default OrderList;

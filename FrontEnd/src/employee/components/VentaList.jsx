import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { catchSales } from '../../access-control/utils/useMethods';
import ModalProducts from './ModalProduts';

function VentaList({ page, filter, addProduct }) {
    const [productos, setProductos] = useState([]);
    const [pageLoad, setPageLoad] = useState(page);
    const [isMounted, setIsMounted] = useState(false);
    const [reload, setReload] = useState(false);
    const [show, setShow] = useState(false);
    const [venta, setVenta] = useState(null);

    const obtOrders = async () => {
        const response = await catchSales();
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
                        setVenta(data.productos); 
                        setShow(true);
                    }}
                />
            </div>
        );
    };

    return (
        <>
            <ModalProducts show={show} setShow={setShow} venta={venta} />
            <DataTable
                value={productos}
                scrollable
                globalFilter={filter}
                scrollHeight="40rem"
                tableStyle={{ minWidth: '40rem' }}
            >
                <Column field="id_venta" header="ID" />
                <Column field="fechaVenta" header="Fecha venta" />
                <Column field="id_pedido" header="ID Pedido" />
                <Column field="total" header="Total" />
                <Column field="cantidad" header="No.Unidades" />
                <Column body={button} header="Productos" />
            </DataTable>
        </>
    );
}

export default VentaList;

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { VirtualScroller } from 'primereact/virtualscroller';

function ModalProducts({ show, setShow, venta }) {
    console.log(venta);

    const products = (item) => {
        return (
            <div>
                <div className="p-grid p-align-center">
                    <div className="p-col-12 p-md-6">
                        <h4 style={{ marginBottom: '10px', color: '#333' }}>Información Del Producto</h4>
                        <p><strong>ID Producto:</strong> {item.id_producto}</p>
                        <p><strong>Nombre:</strong> {item.nombre}</p>
                        <p><strong>Precio:</strong> ${item.total}</p>
                    </div>
                    <Divider />
                </div>
            </div>
        );
    };

    return (
        <Dialog
            header="Detalles de la Venta"
            visible={show}
            style={{ width: '50vw', borderRadius: '10px' }}
            onHide={() => setShow(false)}
            className="p-dialog-custom"
        >
            {venta && venta.length > 0 ? (
                <VirtualScroller
                    items={venta}
                    itemTemplate={products}
                    itemSize={150}
                    style={{ height: '25rem' }}
                />
            ) : (
                <p style={{ textAlign: 'center', color: '#777' }}>
                    {venta && venta.length === 0
                        ? 'No hay información disponible'
                        : 'Cargando información...'}
                </p>
            )}
        </Dialog>
    );
}

export default ModalProducts;

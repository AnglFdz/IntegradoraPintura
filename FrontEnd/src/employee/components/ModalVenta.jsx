import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';

function ModalVenta({ show, setShow, venta }) {
    return (
        <Dialog
            header="Detalles de la Venta"
            visible={show}
            style={{ width: '50vw', borderRadius: '10px' }}
            onHide={() => setShow(false)}
            className="p-dialog-custom"
        >
            {venta ? (
                <div>
                    <div className="p-grid p-align-center">
                        <div className="p-col-12 p-md-6">
                            <h4 style={{ marginBottom: '10px', color: '#333' }}>Información General</h4>
                            <p><strong>Fecha:</strong> {venta[0].fechaVenta}</p>
                            <p><strong>ID Venta:</strong> {venta[0].id_venta}</p>
                            <p><strong>Total:</strong> ${venta[0].total}</p>
                        </div>
                    </div>
                    <Divider />
                    <p style={{ textAlign: 'center', color: '#555', marginTop: '20px' }}>
                        Gracias por consultar los detalles de esta venta.
                    </p>
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#777' }}>Cargando información...</p>
            )}
        </Dialog>
    );
}

export default ModalVenta;

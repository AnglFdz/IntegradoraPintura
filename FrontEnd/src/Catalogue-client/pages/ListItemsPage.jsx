import React from 'react'
import ItemsList from '../../employee/components/ItemsList';
import ModalItems from '../../employee/components/ModalItems';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function ListItemsPage() {
    return (
        <>
            <div className="grid w-full bg-bluegray-200 p-3">
                <div className="p-inputgroup flex-1 pr-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-search"></i>
                    </span>
                    <InputText placeholder="Buscar producto" />
                </div>
                <ModalItems text='Añadir producto' />
            </div>
            <ItemsList page='employee/items' />
        </>
    )
}

export default ListItemsPage
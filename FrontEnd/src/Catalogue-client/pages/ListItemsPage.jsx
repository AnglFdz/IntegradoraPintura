import React from 'react'
import ItemsList from '../../employee/components/ItemsList';
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
                <Button label="Añadir productos" className=" p-button-rounded p-button-text bg-blue-600 text-50" />
            </div>
            <ItemsList page='employee/items' />
        </>
    )
}

export default ListItemsPage
import React from 'react'
import ItemsList from '../../employee/components/ItemsList';
import ModalItems from '../../employee/components/ModalItems';
import { InputText } from 'primereact/inputtext';

function ListItemsPage() {
    const [filter, setFilter] = React.useState('');
    const [reload, setReload] = React.useState(false);
    const forcedReload = () => {setReload(!reload)};
    React.useEffect(() => {}, [reload]);
    return (
        <>
            <div className="grid w-full bg-bluegray-200 p-3">
                <div className="p-inputgroup flex-1 pr-2">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-search"></i>
                    </span>
                    <InputText placeholder="Buscar producto" onChange={(e) => setFilter(e.target.value)} />
                </div>
                <ModalItems text='Añadir producto' reload={forcedReload} />
            </div>
            <ItemsList page='employee/items' filter={filter} addProduct={reload}/>
        </>
    )
}

export default ListItemsPage
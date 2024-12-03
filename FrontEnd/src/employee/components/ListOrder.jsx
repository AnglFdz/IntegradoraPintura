import React from 'react'
import VentasList from './OrderList';
import { InputText } from 'primereact/inputtext';

function ListOrder() {
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
            </div>
            <VentasList page='employee/items' filter={filter} addProduct={reload}/>
        </>
    )
}

export default ListOrder;
import React from 'react'
import VentaList from './VentaList';
import { InputText } from 'primereact/inputtext';
import { getData } from '../../access-control/utils/useMethods';

function ListVenta() {
    const [filter, setFilter] = React.useState('');
    const [reload, setReload] = React.useState(false);
    const [pageLoad, setPageLoad] = React.useState(getData('role') === 3 ? 'client' : 'employee/sale');
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
            <VentaList page={pageLoad} filter={filter} addProduct={reload}/>
        </>
    )
}

export default ListVenta;
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from '../global-components/NavBar'
import Login from '../access-control/components/Login'
import RecoveryPassword from '../access-control/components/RecoveryPassword'
import Register from '../access-control/components/Register'
import CataloguePage from '../Catalogue-client/pages/CataloguePage'
import CatalogueEmployeePage from '../employee/pages/CatalogueEmployeePage'
import Homepage from '../Catalogue-client/homepage'
import Catalogue from '../Catalogue-client/catalogue'
import ListItemsPage from '../Catalogue-client/pages/ListItemsPage'
import Dashboard from '../Administer/Dashboard'
import ListOrder from '../employee/components/ListOrder'
import ListVenta from '../employee/components/ListVenta'
import { getData } from '../access-control/utils/useMethods'


function AllRoutes() {
    const validSessionExist = getData('role');
    const [role, setRole] = React.useState(validSessionExist ? validSessionExist : null);
    const [reload, setReload] = React.useState(false);
    const navigate = useNavigate();
    

    const Reload = () => {
        setReload(!reload);
    };

    return (
        <>
            {validSessionExist ? <NavBar session={role}  /> : null}
            <Routes>
                {validSessionExist ? (
                    <>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/cataloge' element={<CataloguePage />} />
                        <Route path='/employee/sale' element={<CatalogueEmployeePage />}/>
                        <Route path='/employee/saleList' element={<ListVenta />}/>
                        <Route path='/employee/orders' element={<ListOrder />}/>
                        <Route path='/employee/items' element={<ListItemsPage/>}/>
                        <Route path='/home' element={<Homepage />} />
                        <Route path='/catalogue' element={<Catalogue />} />
                        <Route path='/store' element={<Homepage/>} />
                        <Route path='/store/items' element={<Catalogue/>}/> 
                    </>
                ) : (
                    <>
                        <Route path='/' element={<Login reload={Reload} />} />
                        <Route path='/recovery' element={<RecoveryPassword />} />
                        <Route path='/register' element={<Register />} />     
                    </>
                )}
            </Routes>
        </>
    );
}
export default AllRoutes;
import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavBar from '../global-components/NavBar'
import Login from '../access-control/components/Login'
import RecoveryPassword from '../access-control/components/RecoveryPassword'
import Register from '../access-control/components/Register'
import CataloguePage from '../Catalogue-client/pages/CataloguePage'
import CatalogueEmployeePage from '../employee/pages/CatalogueEmployeePage'

function AllRoutes() {
    const validSessionExist = localStorage.getItem('session');
    const [role, setRole] = React.useState(validSessionExist ? JSON.parse(validSessionExist).rol : null);
    const [reload, setReload] = React.useState(false);
    const navigate = useNavigate();

    const Reload = () => {
        setReload(!reload); 
    };

    return (
        <>
            {validSessionExist ? <NavBar session={role} /> : null}
            <Routes>
                {validSessionExist ? (
                    <>
                        <Route path='/catalogue' element={<CataloguePage />} />
                        <Route path='/employee' element={<CatalogueEmployeePage />} />
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

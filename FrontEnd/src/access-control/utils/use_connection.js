import ApiManager from '../../global-components/apiManager';
import { getData } from './useMethods';


export const sendLogin = async (data) => {
    try {
        const response = await ApiManager.post('/auth/signin', data);
        return response;
    } catch (error) {
        return error;
    }
}

export const sendRegister = async (data) => {
    try {
        const response = await ApiManager.post('/usuarios/crear/USER_ROLE', data);
        return response;
    } catch (error) {
        return error;
    }

}

export const catchProducts = async () => {
    try {
        const response = await ApiManager.get('/productos', {
            headers: {
                'Authorization': `Bearer ${getData('token')}`
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await ApiManager.delete(`/productos/${id}`, {
            headers: {
                'Authorization': `Bearer ${getData('token')}`
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}


export const addProduct = async (data) => {
    try {
        const response = await ApiManager.post('/productos', data, {
            headers: {
                'Authorization': `Bearer ${getData('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const updateProduct = async (data) => {
    try {
        const response = await ApiManager.put(`/productos/${data.id}`, data, {
            headers: {
                'Authorization': `Bearer ${getData('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const addOrder = async (data) => {
    try {
        const response = await ApiManager.post('/pedidos', data, {
            headers: {
                'Authorization': `Bearer ${getData('token')}`
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}

export const setPurchase = async (data) => {
    try {   
        const response = await ApiManager.post('/ventas', data, {
            headers: {
                'Authorization': `Bearer ${getData('token')}`
            }
        });
        return response;
    }
    catch (error) {
        return error;
    }
}

export const mergePurchaseOrder = async (data) => {
    try {
        const response = await ApiManager.put(`/ventas/${data.id_venta}/pedido/${data.id_pedido}`, {}, {
            headers: {
                'Authorization': `Bearer ${getData('token')}`
            }
        });
        return response;
    }
    catch (error) {
        return error;
    }
}

export const catchOrders = async () => {
    try {
        const response = await ApiManager.get('/pedidos', {
            headers: {
                'Authorization': `Bearer ${getData('token')}`
            }
        });
        return response;
    }  catch (error) {
        return error;
    }

}

export const getSales = async () => {
    try {
        const response = await ApiManager.get('/ventas', {
            headers: {
                'Authorization': `Bearer ${getData('token')}`
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}
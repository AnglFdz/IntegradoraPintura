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
                'Authorization': `Bearer ${getData()}`
            }
        });
        return response;
    } catch (error) {
        return error;
    }
}
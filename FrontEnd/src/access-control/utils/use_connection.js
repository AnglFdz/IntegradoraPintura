import ApiManager from '../../global-components/apiManager';


export const sendLogin = async (data) => {
    const response = await ApiManager.post('/auth/signin', data);
    return response;
}
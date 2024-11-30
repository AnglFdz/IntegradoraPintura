import Swal from 'sweetalert2';
import * as Connection from './use_connection'
import CryptoJS from 'crypto-js';

/* Alertas */
const successMessage = ["Inicio de sesión correcto"];
const errorMessage = ["Usuario o contraseña incorrectos"];

export const getToken = () => {
    const session = localStorage.getItem('session');
    if (session === null) {
        return null;
    } else {
        const sessionData = JSON.parse(session);
        const bytes = CryptoJS.AES.decrypt(sessionData.user, 'pintura');
        const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).token;
        return token;
    }
}

export const sendMessage = (type, messaje) => {
    switch (type) {
        case 'load':
            Swal.fire({
                title: 'Cargando',
                icon: 'info',
                text: 'Espere un momento por favor',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1500
            });
            break;
        case 200:
            Swal.fire({
                title: 'Correcto',
                icon: 'success',
                text: successMessage[messaje],
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1500
            });
            break;
        case 400:
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: errorMessage[messaje],
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1500
            });
            break;
    }
}

/* Alertas */


export const validMail = (email) => {
    var valid = true;
    const valueMail = email;
    if (valueMail.includes('@') === true) {
        const trackmail = valueMail.split('@');
        trackmail < 0 ?
            valid = true
            : trackmail[1].includes('.') ?
                valid = false : valid = true;
        return valid;
    } else {
        return valid;
    }
}

export const loginMethod = ({ newData, reload, navigate }) => {
    const userInfo = {
        name: newData.user.nombre,
        ap1: newData.user.ap1,
        ap2: newData.user.ap2,
        user: newData.user.email,
        token: newData.token,
        role: newData.user.role.id_role
    }
    const saveUser = CryptoJS.AES.encrypt(JSON.stringify(userInfo), 'pintura').toString();
    localStorage.setItem('session', JSON.stringify({ user: saveUser }));
    navigate('/catalogue');
    setTimeout(() => {
        console.clear();
    }, 1000);
    reload();
}

export const login = async ({ data }) => {
    const response = await Connection.sendLogin(data);
    const newData = response.data.data;
    if (response.status === 200) {
        return newData;
    } else {
        return null;
    }
}

export const register = async ({ data, navigate }) => {
    const user = {
        id_usuario: 0,
        nombre: data.name,
        ap1: data.lastName,
        ap2: data.secondLastName,
        email: data.email,
        contrasena: data.password
    }
    const response = await Connection.sendRegister(user);
    if (response.status === 201) {
        sendMessage(200, 0)
        navigate('/');
    } else {
        sendMessage(0, 'error');
    }
}

export const getProducts = async () => {
    const response = await Connection.catchProducts();
    if (response.status === 200) {
        return response.data.data;
    } else {
        return null;
    }
}

export const setProduct = async ({ data }) => {
    sendMessage('load', 0);
    const response = await Connection.addProduct(data);
    if (response.status === 201) {
        sendMessage(200, 0);
        return response;
    } else {
        return null;
    }
}


export const eliminateProduct = async ({data}) => {
    sendMessage('load', 0);
    const response = await Connection.deleteProduct(data);
    if (response.status === 204) {
        sendMessage(200, 0);
        return response;
    } else {
        return null;
    }
}
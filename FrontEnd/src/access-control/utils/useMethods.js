import Swal from 'sweetalert2';
import * as Connection from './use_connection'
import CryptoJS from 'crypto-js';

/* Alertas */
const successMessage = ["Inicio de sesión correcto"];
const errorMessage = ["Usuario o contraseña incorrectos"];

export const getToken = () =>{
    const session = JSON.parse(localStorage.getItem('session'));
    return session.token;
}

export const sendMessage = (messaje, type) => {
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
        case 'error':
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
    localStorage.setItem('session', JSON.stringify({ user: saveUser}));
    navigate('/catalogue');
    setTimeout(() => {
        console.clear();
    }, 1000);
    reload();
}

export const login = async ({data, reload, navigate}) => {
    const response = await Connection.sendLogin(data);
    const newData = response.data.data;
    if (response.status === 200) {
        loginMethod({ newData, reload, navigate });
        sendMessage(200, 0)
    } else {
        sendMessage(0, 'error');
    }
    
}
import Swal from 'sweetalert2';

/* Alertas */
const successMessage = []
const errorMessage = []

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
        case 'succes':
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
                text: messaje,
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

export const loginMethod = async ({ data, reload, navigate }) => {
    localStorage.setItem('session', JSON.stringify({ user: data.mail, rol: 1 }));
    navigate('/catalogue');
    reload();
}
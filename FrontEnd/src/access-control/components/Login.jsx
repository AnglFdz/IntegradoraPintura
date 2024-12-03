import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { validMail, login as LG, sendMessage, loginMethod } from '../utils/useMethods'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/prueba.png'

function Login({reload}) {
    const [validForm, setValidForm] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const navigate = useNavigate()

    const styleLink = 'mt-2 no-underline'
    
    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setValidForm(false)
            const mailValidation = validMail(email);
            setValidEmail(mailValidation)
            setValidForm(mailValidation);
        } else {
            setValidForm(true)
        }
    }, [email, password])

    const startLogin = async (e) => {
        e.preventDefault()
        sendMessage('load', 0)
        const data = {
            usuario: email,
            contrasenia: password
        }    
        const start = await LG({data});
        start ? sendMessage(200, 0) : null
        start ? loginMethod({newData: start, reload, navigate}) : sendMessage(400, 0)
        
    }

    return (
        <>
            <div className="container">
                <div className="col-12 h-screen flex justify-content-center align-items-center">
                    <form onSubmit={startLogin} className='shadow-3 p-5 border-round flex justify-content-center align-items-center flex-column'>
                            <img src={img} alt="" className='border-circle' style={{width: '140px'}} />
                            <span className='col-12'>Correo Electronico:</span>
                            <InputText keyfilter="email" className='col-12' onChange={(e) => setEmail(e.target.value)} />
                            {!validEmail ? null : <span className='text-sm text-red-400'>Correo electronico con formato invalido</span>}
                            <span className='col-12 mt-2'>Contraseña:</span>
                            <Password keyfilter='alphanum' className='col-12' onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false}/>
                            {password ? null : <span className='text-sm text-red-400'>Campo requerido</span>}
                            <a href="/recovery" className={`${styleLink}`}>¿Olvidaste tu contraseña?</a>
                            <Button className='mt-3' label='Iniciar sesión' disabled={validForm}/>
                            <p>¿No tienes cuenta? <a href="/register" className={`${styleLink}`}>Create una</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
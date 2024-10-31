import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { validMail } from '../utils/useMethods'
import img from '../../assets/prueba.png'

function Login() {
    const [validForm, setValidForm] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    
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

    const login = async() => {
        console.log('Login');        
    }

    return (
        <>
            <div className="container">
                <div className="col-12 h-screen flex justify-content-center align-items-center">
                    <form onSubmit={login} className='shadow-3 p-5 border-round flex justify-content-center align-items-center flex-column'>
                        <div className='flex align-items-center flex-column'>
                            <img src={img} alt="" className='border-circle' style={{width: '140px'}} />
                            <span className='col-12'>Correo Electronico:</span>
                            <InputText keyfilter="email" className='col-12' onChange={(e) => setEmail(e.target.value)} />
                            {!validEmail ? null : <span className='text-sm text-red-400'>Correo electronico con formato invalido</span>}
                            <span className='col-12 mt-2'>Contraseña:</span>
                            <Password keyfilter='alphanum' className='col-12' onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false}/>
                            <a href="/recovery" className='mt-2 no-underline'>¿Olvidaste tu contraseña?</a>
                            <Button className='mt-3' onClick={login} label='Iniciar sesión' disabled={validForm}/>
                            <p>¿No tienes cuenta? <a href="/register" className='mt-5 no-underline'>Create una</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
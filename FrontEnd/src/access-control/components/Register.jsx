import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { sendMessage, register } from '../utils/useMethods';
import { useNavigate } from 'react-router-dom'

function Register() {

    const navigate = useNavigate()
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [secondLastName, setSecondLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [user, setUser] = React.useState(null)
    const [isMounted, setIsMounted] = React.useState(false)

    const validateEmail = (email) => {
        const validate = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
        setEmail(validate ? email : null)
    }

    const validatePassword = (password) => {
        const validate = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g)
        setPassword(validate ? password : null)
    }

    const sendNewUser = async (e) => {
        e.preventDefault()
        sendMessage('load', 0)
        await register({data: user, navigate})
    }

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    React.useEffect(() => {
        const newUser = {
            name, 
            lastName,
            secondLastName,
            email,
            password: password === confirmPassword && password.length >= 8 ? password : null,
            type: 'USER_ROLE'
        }
        if(!Object.entries(newUser).some(([key, value]) => !value)){
            setUser(newUser)
        }
    }, [isMounted, name, lastName, secondLastName, email, password, confirmPassword])

    const style = ' flex flex-column justify-content-center align-items-center'
    const styleDivision = 'mt-3'
    return (
        <>
            <div className="container">
                <div className={` ${style} h-screen`}>
                    <form onSubmit={(e)=>sendNewUser(e)} className={`${style} p-5 border-round shadow-3`}>
                        <h1>Registro</h1>
                        <span className={`${styleDivision}`}>Introduzca su nombre:</span>
                        <InputText keyfilter={'alpha'} max={50} invalid={!name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
                        {!name && <small className='text-red-400'>El nombre es requerido</small>}
                        <span className={`${styleDivision}`}>Introduzca su primer apellido:</span>
                        <InputText keyfilter={'alpha'} max={50} invalid={!lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido paterno" />
                        {!lastName && <small className='text-red-400'>El apellido paterno es requerido</small>}
                        <span className={`${styleDivision}`}>Introduzca su segundo apellido:</span>
                        <InputText keyfilter={'alpha'} max={50} invalid={!secondLastName} onChange={(e) => setSecondLastName(e.target.value)} placeholder="Apellido Materno" />
                        {!secondLastName && <small className='text-red-400'>El apellido materno es requerido</small>}
                        <span className={`${styleDivision}`}>Introduzca su correo electronico:</span>
                        <InputText keyfilter={'email'} max={50} invalid={!email} onChange={(e) => validateEmail(e.target.value)} placeholder="Correo" />
                        {!email && <small className='text-red-400'>El correo es requerido</small>}
                        <span className={`${styleDivision}`}>Introduce una contraseña:</span>
                        <Password keyfilter={'alphanum'} min={8} max={20} invalid={!password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" toggleMask />
                        {!password && <small className='text-red-400'>La contraseña es requerida</small>}
                        <details open>
                            <summary>Recomendaciones para la contraseña</summary>
                            <p className='text-sm'>- Debe tener minimo 8 caracteres y maximo 20</p>
                            <p className='text-sm'>- Debe contener al menos un numero</p>
                            <p className='text-sm'>- Debe contener al menos una mayuscula</p>
                        </details>
                        <span className={`${styleDivision}`}>Confirma tu contraseña:</span>
                        <Password keyfilter={'alphanum'} min={8} max={20} invalid={!confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${styleDivision}`} placeholder="Confirmar contraseña" toggleMask />
                            {!confirmPassword && <small className='text-red-400'>La confirmación es necesaria</small>}
                        {confirmPassword && confirmPassword != password && <small className='text-red-400'>Las contraseñas no coinciden</small>}
                        <div className="col-12">
                        <Button className={`${styleDivision} col-5`} onClick={(e) => sendNewUser(e)} label="Registrarse" disabled={!user} />
                            <Button label='Cancelar' className='bg-red-400 col-5 ml-5' onClick={(e)=>{e.preventDefault(); navigate('/')}} />

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
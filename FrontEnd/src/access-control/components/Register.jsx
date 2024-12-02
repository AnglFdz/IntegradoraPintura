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
    const [user, setUser] = React.useState({})
    const [isMounted, setIsMounted] = React.useState(false)

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
            password: password === confirmPassword ? password : null,
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
                        <InputText invalid={!name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
                        <span className={`${styleDivision}`}>Introduzca su primer apellido:</span>
                        <InputText invalid={!lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido paterno" />
                        <span className={`${styleDivision}`}>Introduzca su segundo apellido:</span>
                        <InputText invalid={!secondLastName} onChange={(e) => setSecondLastName(e.target.value)} placeholder="Apellido Materno" />
                        <span className={`${styleDivision}`}>Introduzca su correo electronico:</span>
                        <InputText invalid={!email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
                        <span className={`${styleDivision}`}>Introduce una contraseña:</span>
                        <Password invalid={!password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" toggleMask />
                        <details open>
                            <summary>Recomendaciones para la contraseña</summary>
                            <p className='text-sm'>- Debe tener minimo 8 caracteres y maximo 20</p>
                            <p className='text-sm'>- Debe tener minimo 8 caracteres y maximo 20</p>
                            <p className='text-sm'>- Debe tener minimo 8 caracteres y maximo 20</p>
                        </details>
                        <span className={`${styleDivision}`}>Confirma tu contraseña:</span>
                        <Password invalid={!confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`${styleDivision}`} placeholder="Confirmar contraseña" toggleMask />
                        <Button className={`${styleDivision}`} onClick={(e) => sendNewUser(e)} label="Registrarse" disabled={!user} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
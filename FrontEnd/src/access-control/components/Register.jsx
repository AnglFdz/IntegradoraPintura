import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'


function Register() {
    const style = ' flex flex-column justify-content-center align-items-center'
    const styleDivision = 'mt-3'
  return (
    <>
        <div className="container">
            <div className={` ${style} h-screen`}>
                <form className={`${style} p-5 border-round shadow-3`}>
                    <h1>Registro</h1>
                    <span className={`${styleDivision}`}>Introduzca su nombre:</span>
                    <InputText placeholder="Nombre" />
                    <span className={`${styleDivision}`}>Introduzca su correo electronico:</span>
                    <InputText placeholder="Nombre" />
                    <span className={`${styleDivision}`}>Introduzca su correo electronico:</span>
                    <InputText placeholder="Nombre" />
                    <span className={`${styleDivision}`}>Introduzca su correo electronico:</span>
                    <InputText placeholder="Correo" />
                    <span className={`${styleDivision}`}>Introduce una contraseña:</span>
                    <Password placeholder="Contraseña" toggleMask/>
                    <details>
                        <summary>Recomendaciones para la contraseña</summary>
                        <p className='text-sm'>- Debe tener minimo 8 caracteres y maximo 20</p>
                        <p className='text-sm'>- Debe tener minimo 8 caracteres y maximo 20</p>
                        <p className='text-sm'>- Debe tener minimo 8 caracteres y maximo 20</p>
                    </details>
                    <Password className={`${styleDivision}`} placeholder="Confirmar contraseña" toggleMask/>
                    <Button className={`${styleDivision}`} label="Registrarse"/>
                </form>
            </div>
        </div>
    </>
  )
}

export default Register
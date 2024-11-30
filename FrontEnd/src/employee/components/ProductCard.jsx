import React from 'react'

function ProductCard({item, onRemove}) {
  return (
    <div className='flex justify-content-center align-items-center md:col-10 sm:col-12 text-xl bg-blue-700 grid border-round-xl mt-3'>
      <div className='grid flex justify-content-center align-items-center'>
        <div className="field mr-5 text-50">
          <p>{item.nombre}</p>
          <p>Cantidad</p>
        </div>
        <div className="field">
          <p className='text-50'>Precio c/u: ${item.precio} </p>
          <p className='flex justify-content-center bg-bluegray-50 text-black-alpha-900 p-1 border-round-sm'>{item.cantidad}</p>
        </div>
      <p className='hover:bg-blue-800 p-2 ml-5 text-50 text-xl' onClick={()=>onRemove(item.id_producto)}>X</p>
      </div> 
    </div>
  )
}

export default ProductCard
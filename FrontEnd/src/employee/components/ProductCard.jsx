import React from 'react'

function ProductCard() {
  return (
    <div className='flex justify-content-center align-items-center text-xl bg-blue-700 grid border-round-xl mt-2'>
      <div className='grid flex justify-content-center align-items-center'>
        <div className="field mr-5 text-50">
          <p>Pintura</p>
          <p>Cantidad</p>
        </div>
        <div className="field mt-1">
          <p className='text-50'>Precio c/u: </p>
          <p className='flex justify-content-center bg-bluegray-50 text-black-alpha-900 p-1 border-round-sm'>20</p>
        </div>
      <p className='hover:bg-blue-800 p-2 ml-5 text-50 text-xl' onClick={()=>console.log("Hola mundo")}>X</p>
      </div> 
    </div>
  )
}

export default ProductCard
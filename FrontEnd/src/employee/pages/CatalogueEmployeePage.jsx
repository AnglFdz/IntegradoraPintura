import React from 'react'
import Cart from '../components/Cart'
import ListProducts from '../components/ListProducts'

function CatalogueEmployeePage() {
  return (
    <>
    <div className='grid'>
        <div className="col-8">
        <ListProducts/>
        </div>
        <div className='col-4'>
        <Cart/>
        </div>
    </div>
    </>
  )
}

export default CatalogueEmployeePage
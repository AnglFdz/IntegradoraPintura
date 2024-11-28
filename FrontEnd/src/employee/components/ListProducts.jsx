import React, { useState, useEffect } from 'react';
import Cart from './Cart';
import ItemsList from './ItemsList';

function ListProducts() {

    const styleHeader = 'bg-blue-600 text-bluegray-50 border-round-xl flex justify-content-center';
    return (
        <>
            <div className="flex flex-row w-full">
                <div className={`${styleHeader} col-8`}>
                    <h2>Productos</h2>
                </div>
                <div className={`${styleHeader} col-4`}>
                    <h2>Carritos</h2>
                </div>
            </div>

            <div className="grid mt-2 h-full">
                <div className="col-8">
                    <ItemsList page='employee' />
                </div>
                <div className="col-4">
                    <Cart />
                </div>
            </div>
        </>
    )
}

export default ListProducts
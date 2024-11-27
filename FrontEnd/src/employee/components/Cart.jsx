import React from 'react'
import ProductCard from './ProductCard';
import { VirtualScroller } from 'primereact/virtualscroller';

function Cart() {
  const [products, setProducts] = React.useState([{
    id: 1,
    name: 'Pintura',
    price: 20,
    quantity: 1
  },
  {
    id: 2,
    name: 'Pincel',
    price: 10,
    quantity: 2
  },
  {
    id: 3,
    name: 'Lienzo',
    price: 50,
    quantity: 1
  },
  {
    id: 4,
    name: 'Lienzo',
    price: 50,
    quantity: 1
  },
  {
    id: 5,
    name: 'Lienzo',
    price: 50,
    quantity: 1
  },
  {
    id: 6,
    name: 'Lienzo',
    price: 50,
    quantity: 1
  },
  {
    id: 6,
    name: 'Lienzo',
    price: 50,
    quantity: 1
  },
  {
    id: 6,
    name: 'Lienzo',
    price: 50,
    quantity: 1
  },
  {
    id: 6,
    name: 'Lienzo',
    price: 50,
    quantity: 1
  }
  ]);
  
  const [items] = React.useState(products);

  const itemTemplate = (item, options) => {
    return (
      <ProductCard />
    );
};

  return (
    <>
      <div className="border-1 border-round-xl p-4 h-auto field">
        <div>
        <VirtualScroller items={items} itemSize={100} itemTemplate={itemTemplate} className="border-1 surface-border border-round" style={{ width: '27rem', height: '25rem' }} />
        </div>
        <div className='field flex justify-content-start align-items-center text-xl bg-gray-900 w-full border-round-xl mt-2'>
          <div className=' grid'>
            <div className='grid flex justify-content-center align-items-center ml-5'>
              <div className="field mr-5 text-50" style={{marginTop: '10px'}}>
                <p>Total:</p>
                <p>Pago:</p>
                <p style={{marginTop: '30px'}}>Cambio:</p>
                <button>Hola mundo</button>
              </div>
              <div>
                <p className='text-50'>$0.00 </p>
                <p className='flex justify-content-center bg-bluegray-50 text-black-alpha-900 p-1 border-round-sm'>0.00</p>
                <p className='text-50'>$0.00 </p>
                <p className='text-black-alpha-900'>l</p>
              </div>
              <div>
              </div>
            </div>
          </div> {/*  */}
        </div>{/*  */}
      </div>
    </>
  )
}

export default Cart
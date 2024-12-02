import React from 'react'
import ProductCard from './ProductCard';
import { Button } from 'primereact/button';
import { VirtualScroller } from 'primereact/virtualscroller';
import { InputText } from 'primereact/inputtext';
import { addPurchase, getData, mergePO, setOrder } from '../../access-control/utils/useMethods';

function Cart({products, remove, add}) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [cambio, setCambio] = React.useState(0);
  const [pago, setPago] = React.useState(0);
  const [merge, setMerge] = React.useState({});

  const calcularCantidad = ()=>{
    let cantidad = 0;
    products.forEach((item) => {
      cantidad += item.cantidad;
    });
    console.log(cantidad);    
    return cantidad;
  }

  const calcularPago = () =>{
    let total = 0;
    products.forEach((item) => {
      total += item.precio * item.cantidad;
    });
    setTotal(total);
    setCambio(pago > total ? pago - total : 0);
  }

  const setVenta = async () => {
    const newArray = products.map((item) => {
      return item.id_producto;
    }) 
    const data = {
      total: total,
      cantidad: calcularCantidad(),
      fechaVenta: 'hol',
      id_usuario: getData('id'),
      id_pedido: null,
      productos: newArray
    }
    const dataOrder = {
      id_usuario: getData('id'),
      total: total
    }
    const response = await addPurchase({data});
    if(response.status === 201) {
    const responseOrder =  await setOrder(dataOrder)
    if(responseOrder.status === 201){
      const dataMerge = {
        id_venta: response.data.data.id_venta,
        id_pedido: responseOrder.data.data.id
      }
      setMerge(dataMerge);
    }
  }
  }

  const completeMerge = async () => {
    console.log(merge);    
    const response = await mergePO(merge);
    if(response.status === 200){
      console.log('Venta realizada con exito');
    }
  }

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  React.useEffect(() => { 
    if(isMounted){
      calcularPago();
    }  
  }, [isMounted, products, pago]);

  const itemTemplate = (items) => {
    return (
      <div className="ml-5">
      <ProductCard item={items} onRemove={remove} onAdd={add} />
      </div>
    );
};

  return (
    <>
      <div className="border-1 border-round-xl p-1 h-auto field">
        <div>
          {products.length === 0 ? <p className='flex align-items-center justify-content-center text-2xl font-bold h-24rem'>No hay productos en el carrito</p> : 
        <VirtualScroller items={products} itemSize={155} itemTemplate={itemTemplate} className="col-12 border-1 surface-border border-round" style={{ width: 'auto', height: '25rem' }}  /> }
        </div>
        <div className='field flex justify-content-start align-items-center text-xl bg-gray-900 w-full border-round-xl mt-2'>
          <div className=' grid'>
            <div className='grid flex justify-content-center align-items-center ml-5'>
              <div className="field mr-5 text-50" style={{marginTop: '10px'}}>
                <p>Total:</p>
                <p>Pago:</p>
                <p style={{marginTop: '30px'}}>Cambio:</p>
                <Button label='Realizar compra' className='bg-bluegray-50 text-blue-500' onClick={()=>setVenta()} disabled={pago <= total}/>
              </div>
              <div>
                <p className='text-50'>${total} </p>
                <InputText onChange={(e)=> setPago(e.target.value)} keyfilter={'pnum'} className='flex justify-content-center w-5rem bg-bluegray-50 text-black-alpha-900 p-1 border-round-sm'/>
                <p className='text-50'>${pago && total ? cambio : 0.00} </p>
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
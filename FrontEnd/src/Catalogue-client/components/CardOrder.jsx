import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { ProductService } from './service/ProductService';

export default function LoaderDataScrollerDemo() {
    const [products, setProducts] = useState([]);
    const ds = useRef(null);
    
    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column p-4 gap-4">
                    <div className="text-2xl font-bold text-900">{data.name}</div>
                    <div className="text-xl font-semibold">${data.price}</div>
                </div>
            </div>
        );
    };

    const footer = <Button type="text" icon="pi pi-plus" label="Load" onClick={() => ds.current.load()} />;

    return (
        <div className="card">
            <DataScroller ref={ds} value={products} itemTemplate={itemTemplate} rows={5} loader footer={footer} header="Click Load Button at Footer to Load More" />
        </div>
    );
}

import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

function CardPrime({ title, description, image,stock,onAction }) {
  const header = <img alt={title} src={image} style={{ width: "100%" }} />;
  const footer = (
    <span>
      <Button label="Action" icon="pi pi-cart-plus" onClick={onAction} disabled={stock == 0} />
    </span>
  );

  return (
    <Card style={{backgroundColor:'var(--bluegray-50)',borderRadius:'10px'}}
      title={title}
      subTitle={description}
      header={header}
      stock = {stock}
      footer={footer}
      className="md:w-30rem" // Clase de PrimeFlex para margen inferior
    > 
      <p>stock: {stock}</p>
      <p className="m-0">This is a dynamic card using PrimeReact.</p>
    </Card>
  );
}

export default CardPrime;

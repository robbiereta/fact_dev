import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import jquery from "jquery";

var notas = {
  partidas: []
};

const Facturapi = require("facturapi");
const facturapi = new Facturapi("sk_test_VN9W1bQmxaKq2e4j6x81ry870rkwYEXe");
async function recibo() {
  await facturapi.receipts.create({
    payment_form: Facturapi.PaymentForm.EFECTIVO,
    items: notas.partidas
  });
  const searchResult = await facturapi.receipts.list();
  var recibos = searchResult.data.map(function (x) {
    console.log(x);

    return x;
  });
}

export default function Fact() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => jsonCambio(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" {...register("precio")} placeholder="Precio" />
      <input
        type="text"
        {...register("descripcion")}
        placeholder="Descripcion"
      />
      <input type="text" {...register("descripcion")} placeholder="cantidad" />
      <button onClick={recibo}> Nuevo Recibo</button>

      <input type="submit" />
    </form>
  );
}
async function jsonCambio(data) {
  var imp = data.precio;

  var newCon = {
    product: {
      description: "VENTA",
      product_key: "01010101",
      price: Number(imp),
      unit_key: "ACT"
    }
  };

  notas.partidas.push(newCon);
  var total = 0;
  notas.partidas.forEach(function (obj) {
    total += Number(obj.product.price);
  });
  console.log(total);
  // console.log(newCon.product.price);

  // const recibo = await facturapi.receipts.retrieve(receipt.id);
  jquery("<h1>ultimo: " + imp + "/total:" + total + "</h1>").appendTo("#root");
}

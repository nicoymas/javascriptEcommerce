
let metodopago=document.getElementById("metodform");
let metodid=document.getElementById("metodid");
metodopago.addEventListener("submit",metodoDePago);

let costo=0

function metodoDePago(event){
    event.preventDefault();
    alert("hace algo")
    let metodo= metodid.value;//prompt("ingrese 'T' para el pago con targeta(con un aumento del 15%)  o 'E' para efectivo (descuento del 15%): ").toUpperCase()
    if(metodo== "T" || metodo== "E"){
        aumento=costo*0.15
        if(metodo== "T"){
            costo+= aumento

            alert(`eligio el pago con targeta, monto total a pagar es de  ${costo}`)
            //c=confirmacion()
        }else{
            costo-= aumento
            alert("el costo en efectivo es de " + costo)
            //c=confirmacion()
        }//return c
    }else{
        alert("ingrese datos correctos")
    }
    
}
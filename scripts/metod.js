import * as clase from "./classReserva.js";
document.addEventListener('DOMContentLoaded', function() {

const formreserva=document.getElementById("formreserva");
const butonconfirm=document.getElementById("confirm");
butonconfirm.addEventListener("click",confirmacion);
console.log(formreserva)
function confirmacion(event){  
    event.preventDefault();
    let nombre=document.getElementById("formreserva")[0].value;
    let apellido=document.getElementById("formreserva")[1].value;
    let documento=document.getElementById("formreserva")[2].value;
    let pago=true
    let destino=JSON.parse(localStorage.getItem("datosviaje"))
    let reserva=new clase.Reserva(nombre,apellido,documento,pago)
    reserva.agregarDestino(destino);
    localStorage.setItem("reserva",JSON.stringify(reserva));
    formreserva.innerHTML=`<table><tr><td>nombre</td><td>apellido</td><td>documento</td><td>pago</td><td>destino</td></tr>
    <tr><td>${nombre}</td><td>${apellido}</td><td>${documento}</td><td>realizado</td><td>${destino.reg}</td></tr></table><br>`
    let image=document.getElementById("imagenviaje");
    image.innerHTML=`<img src="${destino.img}"height="300 px" width="300 px >`
    
    
    
    console.table(reserva)
    console.table(destino)   
}

}, false);   
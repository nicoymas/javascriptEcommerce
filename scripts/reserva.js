import * as clase from "./classReserva.js";
document.addEventListener('DOMContentLoaded', function() {

    
    
    
    const formreserva=document.getElementById("formreserva");
    const butonconfirm=document.getElementById("confirm");
    let nombreval = document.getElementById('nombreval')
    let apellidoval = document.getElementById('apellidoval')
    let documentoval = document.getElementById('documentoval')
    
    
    
    butonconfirm.addEventListener("click",confirmacion);
  
    function confirmacion(event){  
        event.preventDefault();
        let nombre=document.getElementById("formreserva")[0].value;
        let apellido=document.getElementById("formreserva")[1].value;
        let documento=document.getElementById("formreserva")[2].value;
        let pago=true
        // evitar que envie form vacios
        nombreval.innerHTML= ((nombre||'vacio')==='vacio')?'falto rellenar este campo':''
        apellidoval.innerHTML= ((apellido||'vacio')==='vacio')?'falto rellenar este campo':''
        documentoval.innerHTML= ((documento||'vacio')==='vacio')?'falto rellenar este campo':''
        

        let validar = (((nombre||'vacio')!=='vacio')&&
        ((apellido||'vacio')!=='vacio')&&
        ((documento||'vacio')!=='vacio'))   

        if(validar){ 
        
            let destino=JSON.parse(localStorage.getItem("datosviaje"))
            let reserva=new clase.Reserva(nombre,apellido,documento,pago)
            reserva.agregarDestino(destino);
            localStorage.setItem("reserva",JSON.stringify(reserva));
            formreserva.innerHTML=`<table><tr><td>nombre</td><td>apellido</td><td>documento</td><td>pago</td><td>destino</td></tr>
            <tr><td>${nombre}</td><td>${apellido}</td><td>${documento}</td><td>realizado</td><td>${destino.reg}</td></tr></table><br>`
            
            let image=document.getElementById("imagenviaje");
            image.innerHTML=`<img src="${destino.img}" height="300 px" width="360 px" > </img>`
        
        }
        // console.log(destino)

    }

}, false);   

const reservados=JSON.parse(localStorage.getItem("reserva")) || [];
const inerreserva=document.getElementById("reservas");
inerreserva.innerHTML=`<table><tr><td>nombre</td><td>apellido</td><td>documento</td><td>pago</td><td>destino</td></tr>
<tr><td>${reservados.nombre}</td><td>${reservados.apellido}</td>
<td>${reservados.documento}</td><td>realizado</td><td>${reservados.destino[0].reg}</td></tr></table><br>`


   
    
    
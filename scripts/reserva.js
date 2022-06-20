import * as clase from "./classReserva.js";
document.addEventListener('DOMContentLoaded', function() {

    const formreserva=document.getElementById("formreserva");
    const butonconfirm=document.getElementById("confirm");
    butonconfirm.addEventListener("click",confirmacion);
    // evitar que envie form vacios
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
        image.innerHTML=`<img src="${destino.img}" height="300 px" width="360 px" > </img>`


        // console.log(destino)

    }

}, false);   

const reservados=JSON.parse(localStorage.getItem("reserva")) || [];
const inerreserva=document.getElementById("reservas");
inerreserva.innerHTML=`<table><tr><td>nombre</td><td>apellido</td><td>documento</td><td>pago</td><td>destino</td></tr>
<tr><td>${reservados.nombre}</td><td>${reservados.apellido}</td>
<td>${reservados.documento}</td><td>realizado</td><td>${reservados.destino[0].reg}</td></tr></table><br>`


    let formulario = document.getElementById('ejemplillo')
    let valNombre = document.getElementById('nameVal')
    let valApell = document.getElementById('LnameVal')
    let valEdad = document.getElementById('ageVal')
    let valPass = document.getElementById('passVal')
    let validaciones = {nombVal:false,apellVal:false,edadVal:false,passVal:false}
    formulario.addEventListener('submit',(e)=>{
        e.preventDefault()
        console.log(formulario)
        valNombre.innerHTML= ((formulario[0].value||'vacio')==='vacio')?'el nombre no puede estar vacio':''
        valApell.innerHTML= ((formulario[1].value||'vacio')==='vacio')?'el apellido no puede estar vacio':''
        valEdad.innerHTML= ((formulario[2].value||'vacio')==='vacio')?'la edad no puede estar vacio':''
        valPass.innerHTML= ((formulario[3].value||'vacio')==='vacio')?'el password no puede estar vacio':''

        let validar = (((formulario[0].value||'vacio')!=='vacio')&&
        ((formulario[1].value||'vacio')!=='vacio')&&
        ((formulario[2].value||'vacio')!=='vacio')&&
        ((formulario[3].value||'vacio')!=='vacio'))   

        validar && alert('usuario registrado')
    
    })

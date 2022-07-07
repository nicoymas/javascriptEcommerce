// importando classe de Reserva
import * as clase from "./classReserva.js";
document.addEventListener('DOMContentLoaded', function() {

     // ---------->Eleccion de Pago<----------
    // se toma los elementos del DOM necesarios
    const MensajeCosto=document.getElementById("mensajecosto")
    const EnviaMetodo=document.getElementById("metodform");
    const MetodId=document.getElementById("metodid");
    const DomViaje=document.getElementById("datos2")    
    // se crea una variable para traer datos del localStorage
    const loadviajes=JSON.parse(sessionStorage.getItem("datosviaje"));
    // se verifica si existen datos en el SessionStorage para continuar la operacion, caso contrario se muestra un mensaje de error
    if(loadviajes!= null){
        //se extraen datos del viaje seleccionado para mostrar en el DOM
        let costos= loadviajes.costo
        DomViaje.innerHTML=`<h2>${loadviajes.reg}</h2><h2>${loadviajes.costo}$</h2>
        <img src="${loadviajes.img} "alt="${loadviajes.reg}"height="250 px" width="300 px id ="imagenviajes">`
        // evento para el boton de pago
        EnviaMetodo.addEventListener("submit",metodoDePago);
        // trae los datos del localStorage para aplicarle el porcentaje correspondiente a el metodo y luego guerdar esas modificaciones
        function metodoDePago(event){
            event.preventDefault(); 
            let MedotoPago= MetodId.value;
            let Porcentaje=costos*0.15; // se calcula el porcentaje de costo
            const edicion=JSON.parse(sessionStorage.getItem("datosviaje")) // se trae los datos del localStorage
            // se verifica si el metodo de pago es Tarjeta de credito
            if (MedotoPago== "TARJETA") {
                let Tarjeta=costos+Porcentaje // se calcula el costo con el porcentaje
                const pagotargeta={costo: Tarjeta, img:edicion.img, reg:edicion.reg}// se crea un objeto con los datos del viaje y el costo actualizado
                MensajeCosto.innerHTML=`<h4>eligio el pago con Tarjeta, monto total a pagar es de  ${Tarjeta}</h4>`
                sessionStorage.setItem("datosviaje",JSON.stringify(pagotargeta)) // y se guardan esos cambio
            }else{
                //se aplican los mismos pasos para el metodo de pago con Efectivo solo que con la reduccion del costo
                let Efectivo=costos- Porcentaje
                const pagoefectivo={costo: Efectivo, img:edicion.img, reg:edicion.reg}
                MensajeCosto.innerHTML=`<h4>eligio el pago en Efectivo , monto total a pagar es de  ${Efectivo}</h4>`
                sessionStorage.setItem("datosviaje",JSON.stringify(pagoefectivo))
            }
        }    
    }else{
        MensajeCosto.innerHTML= "<h4> debe elejir un Destino primero</h4>";
    }    
    
    
    // ---------->Formulario de Reservas<----------
    
    
    // se toma los elementos del DOM para mostrar un mensaje en cada uno de los campos que requieren datos
    const FormDeReserva=document.getElementById("formreserva");
    let NombreVal = document.getElementById('nombreval')
    let ApellidoVal = document.getElementById('apellidoval')
    let DocumentoVal = document.getElementById('documentoval')
    let FechaVal = document.getElementById('fechaval')
    

    //obteniendo datos del usuario para guardar junto con el viaje
    FormDeReserva.addEventListener("submit",(e)=>{
        e.preventDefault();
        // se toma los datos del formulario
        let nombre=document.getElementById("formreserva")[0].value;
        let apellido=document.getElementById("formreserva")[1].value;
        let documento=document.getElementById("formreserva")[2].value;
        let pago=true
        let fecha=document.getElementById("formreserva")[3].value;
        //en caso de que esos campos esten "vacios" muestra un mensaje de error
        NombreVal.innerHTML= ((nombre||'vacio')==='vacio')?'falto rellenar este campo':''
        ApellidoVal.innerHTML= ((apellido||'vacio')==='vacio')?'falto rellenar este campo':''
        DocumentoVal.innerHTML= ((documento||'vacio')==='vacio')?'falto rellenar este campo':''
        FechaVal.innerHTML= ((fecha||'vacio')==='vacio')?'falto rellenar este campo':''
        // en caso de que todos los campos esten llenos... 
        let ValidarDatos = (((nombre||'vacio')!=='vacio')&&
        ((apellido||'vacio')!=='vacio')&&
        ((documento||'vacio')!=='vacio')&&
        ((fecha||'vacio')!=='vacio'))   
        //se pasa a confirmar la reserva
        if(ValidarDatos){ 
            // libreria sweetalert para mostrar una alerta de confirmacion
            Swal.fire({
                title: 'confirma tu reserva',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    // en caso de confirmacion se traen los datos del localStorage        
                    const Destino=JSON.parse(sessionStorage.getItem("datosviaje")) 
                    // se crea un objeto con los datos del viaje y los datos del usuario en la class Reserva
                    const reserva=new clase.Reserva(nombre,apellido,documento,pago,fecha)
                    reserva.agregarDestino(Destino)// se agrega el viaje al objeto con una funcion de la classe
                    const ArrayReservas =JSON.parse(sessionStorage.getItem("reserva")) || [] //se trae el sessionStorage de reservas 
                    ArrayReservas.push(reserva)// se agrega nueva reserva al array
                    sessionStorage.setItem("reserva",JSON.stringify(ArrayReservas))// se guarda en el sessionStorage
                    sessionStorage.removeItem("datosviaje")// y se eliminan los datos del sessionStorage "datosviajes" para volver a utilizalo en otras operaciones
                    //muestra una tabla con los la reserva realizada
                    FormDeReserva.innerHTML=`<table border="1"><tr><td border="1">nombre</td>
                    <td>apellido</td><td>documento</td><td>pago</td><td>Destino</td><td>fecha</td></tr>
                    <tr><td>${reserva.nombre}</td><td>${reserva.apellido}</td><td>${reserva.documento}</td>
                    <td>${reserva.destino[0].costo}</td><td>${reserva.destino[0].reg}</td><td> ${reserva.fecha}</tr></table><br>`   
                } else if (result.isDenied) {//cancelacion de reserva
                    Swal.fire('la reserva fue cancelada','', 'info')         
                }
            }) 
        }
    });
}, false);   







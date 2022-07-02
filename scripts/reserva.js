import * as clase from "./classReserva.js";
document.addEventListener('DOMContentLoaded', function() {

    
       
    const mensaje=document.getElementById("mensajecosto")
    const metodopago=document.getElementById("metodform");
    const metodid=document.getElementById("metodid");
    const destino=document.getElementById("datos2")    
    const loadviajes=JSON.parse(sessionStorage.getItem("datosviaje"));
    //se muestran los datos del destino seleccionado y se le aplica el aumento o descuento segun el metodo de pago
    // y se guarda la reserva en el session storage
    if(loadviajes!= null){
    
        let costos= loadviajes.costo
        
        destino.innerHTML=`<h2>${loadviajes.reg}</h2><h2>${loadviajes.costo}$</h2>
        <img src="${loadviajes.img} "alt="${loadviajes.reg}"height="250 px" width="300 px id ="imagenviajes">`
        metodopago.addEventListener("submit",metodoDePago);
        
        function metodoDePago(event){
            event.preventDefault(); 
            let metodo= metodid.value
            if(metodo== "TARJETA" || metodo== "EFECTIVO"){
                let aumento=costos*0.15
                const edicion=JSON.parse(sessionStorage.getItem("datosviaje"))
                
                if (metodo== "TARJETA") {
                    let tarjeta=costos+aumento
                    const pagotargeta={costo: tarjeta, img:edicion.img, reg:edicion.reg}
                    mensaje.innerHTML=`<h4>eligio el pago con tarjeta, monto total a pagar es de  ${tarjeta}</h4>`
                    sessionStorage.setItem("datosviaje",JSON.stringify(pagotargeta))
                }else{
                    let efectivo=costos- aumento
                    const pagoefectivo={costo: efectivo, img:edicion.img, reg:edicion.reg}
                    mensaje.innerHTML=`<h4>eligio el pago en efectivo , monto total a pagar es de  ${efectivo}</h4>`
                    sessionStorage.setItem("datosviaje",JSON.stringify(pagoefectivo))
                }
            }else{
                mensaje.innerHTML="<h4>ingrese datos correctos<h4>";
            }
        }    
    }else{
        mensaje.innerHTML= "<h4> debe elejir un destino primero</h4>";
    }    
    
    const formreserva=document.getElementById("formreserva");
    let nombreval = document.getElementById('nombreval')
    let apellidoval = document.getElementById('apellidoval')
    let documentoval = document.getElementById('documentoval')
    let fechaval = document.getElementById('fechaval')
    

    //obteniendo datos del usuario para guardar junto con el viaje
    formreserva.addEventListener("submit",(e)=>{
        e.preventDefault();
        let nombre=document.getElementById("formreserva")[0].value;
        let apellido=document.getElementById("formreserva")[1].value;
        let documento=document.getElementById("formreserva")[2].value;
        let pago=true
        let fecha=document.getElementById("formreserva")[3].value;
        //evitar que envie form vacios
        nombreval.innerHTML= ((nombre||'vacio')==='vacio')?'falto rellenar este campo':''
        apellidoval.innerHTML= ((apellido||'vacio')==='vacio')?'falto rellenar este campo':''
        documentoval.innerHTML= ((documento||'vacio')==='vacio')?'falto rellenar este campo':''
        fechaval.innerHTML= ((fecha||'vacio')==='vacio')?'falto rellenar este campo':''
        console.log(nombre)
        let validar = (((nombre||'vacio')!=='vacio')&&
        ((apellido||'vacio')!=='vacio')&&
        ((documento||'vacio')!=='vacio')&&
        ((fecha||'vacio')!=='vacio'))   
        console.log(validar)
        if(validar){ 
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
                   
                    const destino=JSON.parse(sessionStorage.getItem("datosviaje")) 
            
                    const reserva=new clase.Reserva(nombre,apellido,documento,pago,fecha)
                    reserva.agregarDestino(destino)
                    
                    const res =JSON.parse(sessionStorage.getItem("reserva")) || []
                    res.push(reserva)
                    console.log(reserva)

                    sessionStorage.setItem("reserva",JSON.stringify(res))
                    
                    sessionStorage.removeItem("datosviaje")
                    
                    formreserva.innerHTML=`<table border="1"><tr><td border="1">nombre</td>
                    <td>apellido</td><td>documento</td><td>pago</td><td>destino</td><td>fecha</td></tr>
                    <tr><td>${reserva.nombre}</td><td>${reserva.apellido}</td><td>${reserva.documento}</td>
                    <td>${reserva.destino[0].costo}</td><td>${reserva.destino[0].reg}</td><td> ${reserva.fecha}</tr></table><br>`
                    
                } else if (result.isDenied) {
                    Swal.fire('la reserva fue cancelada','', 'info')
                
                }
            })
          
        }
        

    });
    
    
  

    

}, false);   







import * as clase from "./classReserva.js";
document.addEventListener('DOMContentLoaded', function() {

    
    
    
    const formreserva=document.getElementById("formreserva");
    const butonconfirm=document.getElementById("confirm");
    let nombreval = document.getElementById('nombreval')
    let apellidoval = document.getElementById('apellidoval')
    let documentoval = document.getElementById('documentoval')
    let fechaval = document.getElementById('fechaval')
    
    butonconfirm.addEventListener("click",confirmacion);
  
    function confirmacion(event){  
        event.preventDefault();
        let nombre=document.getElementById("formreserva")[0].value;
        let apellido=document.getElementById("formreserva")[1].value;
        let documento=document.getElementById("formreserva")[2].value;
        let pago=true
        let fecha=document.getElementById("formreserva")[3].value;
        // evitar que envie form vacios
        nombreval.innerHTML= ((nombre||'vacio')==='vacio')?'falto rellenar este campo':''
        apellidoval.innerHTML= ((apellido||'vacio')==='vacio')?'falto rellenar este campo':''
        documentoval.innerHTML= ((documento||'vacio')==='vacio')?'falto rellenar este campo':''
        fechaval.innerHTML= ((fecha||'vacio')==='vacio')?'falto rellenar este campo':''

        let validar = (((nombre||'vacio')!=='vacio')&&
        ((apellido||'vacio')!=='vacio')&&
        ((documento||'vacio')!=='vacio')&&
        ((fecha||'vacio')!=='vacio'))   

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
                    // llamo a viajes
                    const destino=JSON.parse(sessionStorage.getItem("datosviaje")) 
                    // guardo datos del viajes en otro sessionStorage
                    const dest={img:destino.img,reg:destino.reg,costo:destino.costo}
                    sessionStorage.setItem("dest",JSON.stringify(dest))
                    //llamo d a datos
                    const datadest=JSON.parse(sessionStorage.getItem("dest"))
                    // guardo datos de formulario
                    const reserva=new clase.Reserva(nombre,apellido,documento,pago,fecha)
                    reserva.agregarDestino(datadest)
                    // guardo reserva con datos de formulario y viaje
                    sessionStorage.setItem("reserva",JSON.stringify(reserva));
                    // llamo la reserva
                    const res =JSON.parse(sessionStorage.getItem("reserva"))
                    // se borran datos de viaje
                    sessionStorage.removeItem("datosviaje")
                    formreserva.innerHTML=`<table border="1"><tr><td border="1">nombre</td><td>apellido</td><td>documento</td><td>pago</td><td>destino</td><td>fecha</td></tr>
                    <tr><td>${res.nombre}</td><td>${res.apellido}</td><td>${res.documento}</td><td>realizado</td><td>${res.destino[0].reg}</td><td> ${res.fecha}</tr></table><br>`//${destino.reg}
                    
                } else if (result.isDenied) {
                    Swal.fire('la reserva fue cancelada', '', 'info')
                
                }
              })
          
        }
        

    }
    const reservados=JSON.parse(sessionStorage.getItem("reserva")) || [];
    console.log(reservados)

    if(reservados.length > 0) {   
        const inerreserva=document.getElementById("reservas");
        inerreserva.innerHTML=`<table><tr><td>nombre</td><td>apellido</td><td>documento</td><td>pago</td><td>destino</td></tr>
        <tr><td>${reservados.nombre}</td><td>${reservados.apellido}</td>
        <td>${reservados.documento}</td><td>realizado</td><td>${rescdest.reg }</td></tr></table><br><img src="${rescdest.img}" height="300 px" width="360 px" > </img>`
    }

    

}, false);   







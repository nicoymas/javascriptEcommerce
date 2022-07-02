
import * as clases from './classviaje.js'

document.addEventListener('DOMContentLoaded', function() {

    
    
    
    // mensaje hasta que se carguen los viajes
    const mensajecarga=document.getElementById("mensajecarga");
    mensajecarga.innerHTML="<h2>Cargando viajes...</h2>";
    const guardados=JSON.parse(localStorage.getItem("listaviajes"));
    
    const divdest=document.getElementById("datos");
    //cargando dtos de viajes .JSON
    fetch('viajes.json')
    .then((data)=>data.json())
    .then((viajes)=>{
        localStorage.setItem("listaviajes",JSON.stringify(viajes))
        for(const lugar of viajes){
           //mostrando dados de viajes
            let muestra = document.createElement("div");
            muestra.className="formdest"
            muestra.innerHTML=`<button id="${lugar.id}" type="submit"  > <br><div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
            <div class="col-lg-6"><img class="img-fluid" src="${lugar.imagen}" alt="..." /></div>
            <div class="col-lg-6">
                <div  id="viaje" class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                        <div class="project-text w-100 my-auto text-center text-lg-left">

                        <h4 class="text-white"> </h4>
                            <h4 class="text-white"> ${lugar.region}</h4>
                            <p class="mb-0 text-white-50">${lugar.precio} $</p>
                            <hr class="d-none d-lg-block mb-0 ms-0" /></div></div></div></div></div><br></button>`
            mensajecarga.innerHTML="";
            divdest.appendChild(muestra);
            //agregando evento al viaje para enviar datos a function destinos
            const botondest=document.getElementById(`${lugar.id}`);
            botondest.addEventListener("click",()=>{
                
                destinos(lugar.id)

            });
        }

        for(const objeto of guardados){
            new clases.Viaje(objeto);
        }; 

        let costo=0
        let img
        let reg
        //verificando si el usuario esta logueado para acceder a esta funcion
        //se extraen datos del viaje seleccionado y se guardan en el session storage
        function destinos( lugar){ 
            if(sesion != null){
                let pais = lugar;            
                guardados.forEach((obj)=>{
                    if(obj.id == pais){
                        costo = obj.precio
                        img = obj.imagen
                        reg = obj.region     
                        let datosviaje={costo:costo,img:img,reg:reg}
                                
                        sessionStorage.setItem('datosviaje',JSON.stringify(datosviaje));
                        Swal.fire({
                            title: `viaje a ${reg}`,
                            text: `$ ${costo}`,    
                            imageUrl: `${img}`,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'ver metodos de pago'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.href="metod.html" 
                            }else{
                                
                            } 
                        })
                    }             
                });  
                
            }else{
                let mensaje= document.getElementById("error")
                mensaje.innerHTML="<h4>debe registrarse para continuar</h4>";
            }
        }   
        
        // deslogeo
        const logout=document.getElementById("logout");
        logout.addEventListener("click",(e)=>{
            e.preventDefault();
            sessionStorage.clear();
            window.location.href="index.html";
        })
    
        const btnIniciarSesion=document.getElementById("botonbusca"); 
        const formulario=document.getElementById("formularioguard");    
        const busqueda=JSON.parse(localStorage.getItem("users"));
        const sesion=JSON.parse(sessionStorage.getItem("usuariossesion"));
        let noencontrado =document.getElementById("error1")
        // solo muestra el formulario si no hay sesion
        //compara los datos igresados con ewl localStorage de usuarios y si son iguales los carga en sessionStoragepara otras funcionalidades
        if(sesion == null){
            logout.style.display="none";
            btnIniciarSesion.addEventListener("click",validacion)
            function validacion(e){
                e.preventDefault();
                const localuser={usuario :document.getElementById("formularioguard")[0].value, pasword: document.getElementById("formularioguard")[1].value}
                
                sessionStorage.setItem("usuariossesion",JSON.stringify(localuser));
                const encontrado=busqueda.find((el)=> el.usuario == localuser.usuario)
                const pasencontrado=busqueda.find((el)=> el.pasword == localuser.pasword)
                if( encontrado && pasencontrado){
                    location.reload()
                    formulario.innerHTML=`<h1>Bienvenido  ${localuser.usuario}</h1>`
                    return 
                } else {
                    noencontrado.innerHTML="Usuario o contraseña incorrectos";
                }
            }
        }else{
            formulario.innerHTML=`<h1>Bienvenido  ${sesion.usuario}</h1>`
        }
        
        
        
    })
    // traer datos de sessionStorage y mostrarlos   
    const reservados=JSON.parse(sessionStorage.getItem("reserva")) || [];
    const inerreserva=document.getElementById("reservas");
    
    reservados.forEach(reserva=>{
        
        let muestrareserva = document.createElement("li");
        muestrareserva.innerHTML=`<div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
        <div class="col-lg-6"><img class="img-fluid" src="${reserva.destino[0].img}"   height="10%" /></div>
        <div class="col-lg-6">
        <div class="bg-black text-center h-100 project">
        <div class="d-flex h-100">
        <div class="project-text w-100 my-auto text-center text-lg-left">
        <h4 class="text-white">${reserva.nombre}</h4>
        <h4 class="text-white">${reserva.apellido}</h4>
        <h4 class="text-white"> ${reserva.destino[0].reg}</h4>
        <p class="mb-0 text-white-50">${reserva.destino[0].costo} $</p>
        <hr class="d-none d-lg-block mb-0 ms-0" /></div></div></div></div></div>`
        inerreserva.appendChild(muestrareserva);
    })
}, false);   


















































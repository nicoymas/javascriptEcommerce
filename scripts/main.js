// importando clases viajes 
import * as clases from './classviaje.js'
// todo el codigo dentro del DOMContentLoaded se ejecuta cuando el DOM esta cargado
document.addEventListener('DOMContentLoaded', function() {

    
    // ---------->Viajes<----------
    
    // mensaje hasta que se carguen los viajes
    const MensajeCarga=document.getElementById("MensajeCarga");
    MensajeCarga.innerHTML="<h2>Cargando viajes...</h2>";

    // html donde se cargaran los viajes
    const HtmlDestinos=document.getElementById("datos");
    
    //cargando datos de viajes .JSON
    fetch('viajes.json')
    .then((data)=>data.json())
    .then((viajes)=>{
        //guardando datos de viajes para luego usarlos en funciones
        localStorage.setItem("listaviajes",JSON.stringify(viajes))
        // por cada viaje se crea una div con una imagen y una descripcion
        for(const lugar of viajes){
            let Muestra = document.createElement("div");
            Muestra.className="formdest"
            Muestra.innerHTML=`
            <button class="Btnviaje container-fluid" id="${lugar.id}" type="submit"  >
                <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                    <div class="col-lg-6">
                        <img class="img-fluid" src="${lugar.imagen}" alt="..." />
                    </div>
                    <div class="col-lg-6">
                        <div id="viaje" class="descripcion text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-left">
                                    <h3 class="text-white"> ${lugar.region}</h3>
                                    <h4 class="text-white"> descripcion </h4>
                                    <p class="mb-0 text-white-50">${lugar.precio} $</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </button>`
            //anulando mensaje de carga
            MensajeCarga.innerHTML="";
            // agrega el elemento creado al div de datos
            HtmlDestinos.appendChild(Muestra);
            //agregando evento al viaje para enviar datos a function destinos
            const botondest=document.getElementById(`${lugar.id}`);
            botondest.addEventListener("click",()=>{
                
                destinos(lugar.id)

            });
        }
        
        const ViajesGuardados=JSON.parse(localStorage.getItem("listaviajes"));
        //por cada objeto de viaje se crea una clase viaje
        for(const objeto of ViajesGuardados){
            new clases.Viaje(objeto);
        }; 

        // ---------->seleccion de destino<----------
        
        // variables donde quedan los datos individuales del viaje elejido para utilizarlo en otras funciones
        let costo=0
        let img
        let reg
        const UserSesion=JSON.parse(sessionStorage.getItem("usuariossesion"));
        //verificando si el usuario esta logueado para acceder a esta funcion
        //se extraen datos del viaje seleccionado y se guardan en el session storage
        function destinos(lugar){ 
            if(UserSesion != null){
                let pais = lugar;
                //recorre el array de viajes para extraer los datos del viaje seleccionado            
                ViajesGuardados.forEach((obj)=>{
                    if(obj.id == pais){
                        costo = obj.precio
                        img = obj.imagen
                        reg = obj.region     
                        //se guardan todos los datos en el session para ser manipuldos en otras funciones
                        let DatosViaje={costo:costo,img:img,reg:reg}        
                        sessionStorage.setItem('datosviaje',JSON.stringify(DatosViaje));
                        //libreria de sweetalert para mostrar mensaje de confirmacion
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
                            // en caso de confirmar el destino se redirige a la pagina de metodos de pago
                            if (result.isConfirmed) {
                                location.href="Reservas.html" 
                            }else{
                                
                            } 
                        })
                    }             
                });  
            // en caso de que ningun usuario este logueado     
            }else{
                let MensajeDeError= document.getElementById("error")
                MensajeDeError.innerHTML="<h4>debe registrarse para continuar</h4>";
            }
        }   
        
        //---------->seccion de Logueo<----------

        //--> Deslogeo
        const Logout=document.getElementById("logout");
        //evento para deslogearse borra los datos del usuario de session storage y recarga la pagina para que las funciones tomen los cambio
        Logout.addEventListener("click",(e)=>{
            e.preventDefault();
            sessionStorage.clear();
            window.location.href="index.html";
        })
        
        //-->Validacion
        const btnIniciarSesion=document.getElementById("botonbusca"); 
        const FormSesion=document.getElementById("FormSesion");    
        const LocalUsers=JSON.parse(localStorage.getItem("users"));
        
        const NoEncontrado =document.getElementById("error1")
        
        // solo muestra el formulario si no hay sesion iniciada
        //compara los datos igresados con ewl localStorage de usuarios y si son iguales los carga en sessionStoragepara otras funcionalidades
        if(UserSesion == null){
            Logout.style.display="none";
            btnIniciarSesion.addEventListener("click",ValidarUser)
            function ValidarUser(e){
                e.preventDefault();
                //captura datos del formulario
                const SessionUser={usuario :document.getElementById("FormSesion")[0].value, pasword: document.getElementById("FormSesion")[1].value}
                // los compara con los datos de localStorage
                const UserFind=LocalUsers.find((el)=> el.usuario == SessionUser.usuario)
                const PaswordFind=LocalUsers.find((el)=> el.pasword == SessionUser.pasword)
                //si coinsiden se guardan en sessionStorage, se recarga la pagina para que las funciones tomen los cambios
                //y se muestra mensaje de bienvenida 
                if( UserFind && PaswordFind){
                    sessionStorage.setItem("usuariossesion",JSON.stringify(SessionUser));
                    location.reload()
                    FormSesion.innerHTML=`<h1>Bienvenido  ${SessionUser.usuario}</h1>`
                    return 
                } else {
                    NoEncontrado.innerHTML="Usuario o contraseña incorrectos";
                }
            }
        }else{
            FormSesion.innerHTML=`<h1>Bienvenido  ${UserSesion.usuario}</h1>`
        }
        
    
        
    })
    //--->muestra reservas en la pagina
    
    // traer datos de reservas en sessionStorage 
    const ReservasInSession=JSON.parse(sessionStorage.getItem("reserva")) || [];
    const InnerReserva=document.getElementById("reservas");
    //por cada reserva crea un elemento html para mostrarlas en pantalla
    ReservasInSession.forEach(reserva=>{
        
        let MostraReserva = document.createElement("li");
        MostraReserva.innerHTML=
        `<div class="container-fluid">
            <div class="col-lg-6">
                <img class="img-fluid" src="${reserva.destino[0].img}"   height="10%" />
            </div>
            <div class="col-lg-6">
                <div class="bg-black text-center h-100 project">
                    <div class="d-flex h-100">
                        <div class="project-text w-100 my-auto text-center text-lg-left">
                            <h4 class="text-white">${reserva.nombre}</h4>
                            <h4 class="text-white">${reserva.apellido}</h4>
                            <h4 class="text-white"> ${reserva.destino[0].reg}</h4>
                            <p class="mb-0 text-white-50">${reserva.destino[0].costo} $</p>
                            <hr class="d-none d-lg-block mb-0 ms-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        InnerReserva.appendChild(MostraReserva);
    })
}, false);   


















































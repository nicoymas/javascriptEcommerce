
import * as clases from './classviaje.js'
document.addEventListener('DOMContentLoaded', function() {

    
    
    const viajes =[
        {id:1 ,region:"Cancun",precio: 2000 , imagen:"https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/319148225.jpg?k=2cb97b204ecc359bf8f5b82f183068167ca910965c83ddb72812f5ce6d3b2871&o=&hp=1"},
        {id:2 ,region:"Playa del Carmen",precio: 2500 , imagen:"https://www.coming2.com/co2content/co2image/1418246196811/playa-del-carmen-RMY-PLAYA-CAR.jpg" },
        {id:3 ,region:"Japon", precio: 3000, imagen:"https://www.caracteristicas.co/wp-content/uploads/2018/08/japon-e1573443550864.jpg" },
    ];
    

    localStorage.setItem("listaviajes",JSON.stringify(viajes));
    
    const guardados=JSON.parse(localStorage.getItem("listaviajes"));
    const viaje=[];
    for(const objeto of guardados){
        viaje.push(new clases.Viaje(objeto));
    }; 
    
 
    
    
    const divdest=document.getElementById("datos");
    const nuevoul= document.createElement("ul");
    nuevoul.id="destino";
    divdest.append(nuevoul);
    document.getElementById("destino");
    for(const lugar of viajes){
        let muestra = document.createElement("li");
        muestra.innerHTML=`<div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
        <div class="col-lg-6"><img class="img-fluid" src="${lugar.imagen}" alt="..." /></div>
        <div class="col-lg-6">
            <div class="bg-black text-center h-100 project">
                <div class="d-flex h-100">
                    <div class="project-text w-100 my-auto text-center text-lg-left">
                        <h4 class="text-white">id: ${lugar.id}</h4>
                        <h4 class="text-white"> ${lugar.region}</h4>
                        <p class="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                        <hr class="d-none d-lg-block mb-0 ms-0" />
                    </div>
                </div>
            </div>
        </div>
    </div>`
        
        
        
        
        nuevoul.appendChild(muestra);
    }
    
   



    let formulario=document.getElementById("formulario");
    
    let boton=document.getElementById("botonsubmit");
    boton.addEventListener("click",validacion)    
    
    //formulario.addEventListener("submit",validacion);
    let respuesta
    
    function validacion(e,nombre,pass){
        e.preventDefault();      
        nombre=document.getElementById("formulario")[0].value
        pass=document.getElementById("formulario")[1].value
        if((nombre.length >= 5 && nombre.length <=10) && pass.length >=5 ) {
            respuesta=true
            
            formulario.innerHTML=`<h1>Bienvenido  ${nombre}</h1>`
        }    
         else{
            let error=document.getElementById("error");
            error.innerHTML=`<h5>los datos ingresados no son validos </h5>`
            respuesta=false
            
         }return respuesta;
    }    
    

    
    let formdest=document.getElementById("formdest");
    let lugarid=document.getElementById("idlugar");
    formdest.addEventListener("submit",destinos);
    let costo=0
    let img
    let reg
    function destinos(e){
        e.preventDefault();
        if(respuesta){
            let pais = lugarid.value;
            viajes.forEach((obj)=>{
            
                if(obj.id == pais){
                    costo = obj.precio
                    let result= true
                    img = obj.imagen
                    reg = obj.region
                    let datosviaje={costo:costo,img:img,reg:reg}
                    localStorage.setItem('datosviaje',JSON.stringify(datosviaje));
                    return result
                }
            });
            formdest.innerHTML=`<h2>${pais}</h2>
            <h2>${reg}</h2><h2>${costo}</h2><a href="#metodform"> metodos de pagos</a>
            <img src="${img} "alt="${reg}"height="300 px" width="1000 px id ="imagenviajes">`
            
            return  result
        }else{
            let mensaje= document.getElementById("error")
            
            mensaje.innerHTML="<h4>debe registrarse para continuar</h4>";
        }return result
    }

   
    const mensaje=document.getElementById("mensajecosto")
    const metodopago=document.getElementById("metodform");
    const metodid=document.getElementById("metodid");
    metodopago.addEventListener("submit",metodoDePago);
    let loadviajes=JSON.parse(localStorage.getItem("datosviaje"));
    let costos= loadviajes.costo
    let destino=document.getElementById("datos2")
    const confirm=document.getElementById("confirm")
    
    
    
    destino.innerHTML=`<h2>${loadviajes.reg}</h2><h2>${loadviajes.costo}</h2>
    <img src="${loadviajes.img} "alt="${loadviajes.reg}"height="250 px" width="300 px id ="imagenviajes">`
    function metodoDePago(event){
        event.preventDefault();
        let metodo= metodid.value.toUpperCase()
        if(metodo== "TARGETA" || metodo== "EFECTIVO"){
            let aumento=costos*0.15
            if(metodo== "TARGETA"){
                costos+= aumento
                
                //confirm.innerHTML=`<a href="metod.html">reservar</a>`

                document.body.appendChild(confirm)
                metodopago.innerHTML=`<h4>eligio el pago con targeta, monto total a pagar es de  ${costos}</h4><a href="metod.html">reservar</a>`
            }else{
                costos-= aumento
                confirm.innerHTML=`<a href="metod.html">reservar</a>`

                document.body.appendChild(confirm)
                mensaje.innerHTML=`<h4>eligio el pago con targeta, monto total a pagar es de  ${costos}</h4>`
            }
        }else{
            mensaje.innerHTML="<h4>ingrese datos correctos<h4>";
        }
    }
    
    
}, false);   























//ver

// Una cosa que me faltó mencionar es que vos el input de la contraseña de usuario lo tenés como tipo texto, 
//pero los navegadores tienen un tipo password específico para estos casos, 
//que oculta lo que se escribe para que nadie lo pueda ver.
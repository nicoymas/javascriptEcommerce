document.addEventListener('DOMContentLoaded', function() {
    let costo=0
    let result
    let aumento
    
    
    class Reserva{
        constructor(nombre,apellido,documento,pago){
            this.nombre=nombre;
            this.apellido=apellido;
            this.documento=documento;
            this.pago=pago;
            this.destino=[];
        }
        agregarDestino(viaje){
            this.destino.push(viaje);
        }
        obtenerDestino(id){
            return this.destino.find((viaje)=>(viaje.id==id));
        }
    }
    class Viaje{
        constructor(id,region,precio,imagen){
            this.id=Number(id);
            this.region=region;
            this.precio=precio;
            this.imagen=imagen;
            this.hospodeaje=[];
        }
        agregarHospedaje(host){
            this.hospodeaje.push(host);
        }
        buscarHospedaje(hotel){
            return this.hospodeaje.find((host)=>(host.hotel==hotel));
        }
        generadorHTML=()=>{
            return`<h3  style="color:green"> ID: ${this.id}</h3> <h4> Lugar: ${this.region}</h4> <h4> Precio: ${this.precio}</h4><br> 
            <img src="${this.imagen} "alt="${this.region}"height="300 px" width="1000 px id ="imagenviajes"> ` 
        }
    }
    
    //function createDestino(id,region,precio){
    //    let id= prompt("Create id");
    //    let region= prompt("Create region");
    //    let precio= parceIntprompt("Create precio");
    //    let newviaje=new Viaje(id,region,precio);
    //    
    //}
        
    //document.getElementById("imagenviajes");

    const viajes =[
        new Viaje (1 ,"Cancun",  2000 ,"https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/319148225.jpg?k=2cb97b204ecc359bf8f5b82f183068167ca910965c83ddb72812f5ce6d3b2871&o=&hp=1"),
        new Viaje (2 ,"Playa del Carmen", 2500 ,"https://www.coming2.com/co2content/co2image/1418246196811/playa-del-carmen-RMY-PLAYA-CAR.jpg" ),
        new Viaje (3 ,"Japon", 3000,"https://www.caracteristicas.co/wp-content/uploads/2018/08/japon-e1573443550864.jpg" ),
    ];
    
    const divdest=document.getElementById("datos");
    const nuevoul= document.createElement("ul");
    nuevoul.id="destino";
    divdest.append(nuevoul);
    document.getElementById("destino");
    for(const lugar of viajes){
        let muestra = document.createElement("li");
        muestra.innerHTML=lugar.generadorHTML();
        nuevoul.appendChild(muestra);
    }
    // formulario validacion
    let formulario=document.getElementById("formulario");
    let username=document.getElementById("username");
    let password=document.getElementById("pass");
    
    let respuesta
    formulario.addEventListener("submit",validacion);
    
    // alt + 96
    
    function validacion(e){
        e.preventDefault();
        let nombre=username.value;
        let pass=password.value;
        if((nombre.length >= 5 && nombre.length <=10) && pass.length >=5 ) {
            respuesta=true
            formulario.innerHTML=`<h1>Bienvenido  ${nombre}</h1>`
        }
        else{
            respuesta=false
            
        }return respuesta;
    }    
    
    let formdest=document.getElementById("formdest");
    let lugarid=document.getElementById("idlugar");
    formdest.addEventListener("submit",destinos);
    let img
    let reg
    function destinos(e){
        e.preventDefault();
        if(respuesta){
            
            let pais = lugarid.value;
            //result=viajes.some((data) => data.id == pais)
            //result=viajes.includes((data) => data.id == pais)
            viajes.forEach((obj)=>{
            
                if(obj.id == pais){
                    costo = obj.precio
                    result= true
                    img = obj.imagen
                    reg = obj.region
                    return result
                }

            });
            formdest.innerHTML=`<h2>${pais}</h2>
            <h2>${reg}</h2><h2>${costo}</h2><a href="metod.html"> metodos de pagos</a>
            <img src="${img} "alt="${this.region}"height="300 px" width="1000 px id ="imagenviajes">`
            return  result
        }else{
            let mensaje= document.getElementById("error")
            
            mensaje.innerHTML="<h4>debe registrarse para continuar</h4>";
        }return result
    }
    console.log(result)
    
    
    //let metodopago=document.getElementById("metodform");
    //let metodid=document.getElementById("metodid");
    //metodopago.addEventListener("submit",metodoDePago);
  
   
    
    function metodoDePago(costo){
        //event.preventDefault();
        
        let metodo= prompt("ingrese 'T' para el pago con targeta(con un aumento del 15%)  o 'E' para efectivo (descuento del 15%): ").toUpperCase()
        //metodid.value;
        if(metodo== "T" || metodo== "E"){
            aumento=costo*0.15
            if(metodo== "T"){
                costo+= aumento

                alert(`eligio el pago con targeta, monto total a pagar es de  ${costo}`)
                c=confirmacion()
            }else{
                costo-= aumento
                alert("el costo en efectivo es de " + costo)
                c=confirmacion()
            }return c
        }else{
            alert("ingrese datos correctos")
        }
        
    }
    let pago
    function confirmacion(){
        let confirm=prompt("para confirmar reserva ingrese 'si' caso contrario 'no':").toLowerCase()
            if(confirm == "si"){
                let nombre=prompt("ingrese nombre:")
                let apellido=prompt("ingrese apellido:")
                let documento=prompt("ingrese documento:")
                pago=true
                let reserva=new Reserva(nombre,apellido,documento,pago)
                console.table(reserva)
                
            }else{
                return false
            }
    }
    
    
    
    
    
    
    
    


    let boton=document.getElementById("boton1");
    let boton2=document.getElementById("boton2");
    let boton3=document.getElementById("boton3");
    let boton4=document.getElementById("boton4");
    let boton5=document.getElementById("boton5");
    
    //boton.addEventListener("click",() =>{
    //    let ingresar
    //    let intentos=0
    //    while(intentos < 3){
    //        alert("bienvenido a tu agencia de viajes \npara seleccionar destino ingrese su usuario y contraseña \n tiene tiene 3 intentos y a intentado "+intentos+" veces")
    //        intentos+=1
    //        ingresar=validacion();
    //        if(ingresar==true){
    //            alert("bienvenido ahora seleccione su destino")
    //            intentos+=4
    //            
    //        }else{
    //            alert("usuario o contraseña incorrectos")
    //        }
    //        
    //    }
    //});            
    
        
        
    boton2.addEventListener("click",() =>{
        if(result){
            
            metodoDePago(costo);
            if(pago){
                alert("felicidades su reserva a sido generada")
            }else{
                alert("volviendo al menu principal")
            }
            
        }
    
    })
  
      

}, false);   




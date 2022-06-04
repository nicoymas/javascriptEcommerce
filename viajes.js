document.addEventListener('DOMContentLoaded', function() {
    let costo=0
    let result
    let aumento
    let data
    
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
        constructor(id,region,precio){
            this.id=id;
            this.region=region;
            this.precio=precio;
            this.hospodeaje=[];
        }
        agregarHospedaje(host){
            this.hospodeaje.push(host);
        }
        buscarHospedaje(hotel){
            return this.hospodeaje.find((host)=>(host.hotel==hotel));
        }
    
    }
    
    //function createDestino(id,region,precio){
    //    let id= prompt("Create id");
    //    let region= prompt("Create region");
    //    let precio= parceIntprompt("Create precio");
    //    let newviaje=new Viaje(id,region,precio);
    //    
    //}
        
    

    const viajes =[
        new Viaje ("1" ,"Cancun",  2000 ),
        new Viaje ("2" ,"Playa del Carmen", 2500 ),
        new Viaje ("3" ,"Japon", 3000 ),
    ];
    let divdest=document.getElementById("datos");
    let nuevoul= document.createElement("ul");
    nuevoul.id="destino";
    divdest.append(nuevoul);
    let destino=document.getElementById("destino");
    for(const lugar of viajes){
        let muestra = document.createElement("li");
        muestra.innerHTML=`<h3 style="color:green"> ID: ${lugar.id}</h3> <h4> Lugar: ${lugar.region}</h4> <h4> Precio: ${lugar.precio}</h4>`;
        nuevoul.appendChild(muestra);
                           
    }
    
    
    function validacion(){
        let usuario= prompt("ingrese un usuario de 5 a 10 digitos:")
        let password=parseInt(prompt("ingrese un pasword (debe ser numerico):"))
        if((usuario.length >= 5 && usuario.length <=10) && Number(password)) {
            return(true)
        }
        else{
            return(false)
        }
    }
    
    function destinos(){
        let pais = prompt("ingrese destino '1' para cancun, '2' para playa del carmen, '3' para japon: ")
        //result=viajes.some((data) => data.id == pais)
        //result=viajes.includes((data) => data.id == pais)
        viajes.forEach((obj)=>{
        
            if(obj.id == pais){
                costo = obj.precio
                result= true
                
                
            }
            
        });
        return result
         
    }
    
    function confirmacion(){
        let confirm=prompt("para confirmar reserva ingrese 'si' caso contrario 'no':").toLowerCase()
            if(confirm == "si"){
                let nombre=prompt("ingrese nombre:")
                let apellido=prompt("ingrese apellido:")
                let documento=prompt("ingrese documento:")
                let pago=true
                let reserva=new Reserva(nombre,apellido,documento,pago)
                console.table(reserva)
                return true
            }else{
                return false
            }
    }
    function metodoDePago(costo){
        let metodo= prompt("ingrese 'T' para el pago con targeta(con un aumento del 15%)  o 'E' para efectivo (descuento del 15%): ").toUpperCase()
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
    for(let i=3; i<=3; i--){
        alert("bienvenido a tu agencia de viajes \npara seleccionar destino ingrese su usuario y contraseña \n tiene la siguiente cantidad de intentos diponibles: "+i)
        let ingresar=validacion();
        
        if(ingresar){
            alert("bienvenido ahora seleccione su destino")
            while(true){
                let opcion=prompt("si desea ver los destinos ingrese 'ver' \n para salir 'salir': ")
                if(opcion=="ver"){
                    let destino= destinos()
                    
                    if(result){
                        let pagos=metodoDePago(costo)
                        if(pagos){
                            alert("felicidades su reserva a sido generada")
                        }else{
                            alert("volviendo al menu principal")
                        }
                    }
                    else{
                        alert("debe ingresar un dato valido para continuar")
                    }    
                }else if(opcion=="salir"){
                    alert("gracias por la visita, vuelve cuando gustes")
                    break
                }else{
                    alert("los datos ingresados no son validos")
                }
            }
            break
        }
    }
}, false);   



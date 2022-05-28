document.addEventListener('DOMContentLoaded', function() {
    let costo=0
    let metodo
    let aumento
    let data
    
    

    const viajes =[
        {id:"C" ,lugar:"Cancun", precio: 2000},
        {id:"P" ,lugar:"Playa del Carmen", precio: 2500},
        {id:"J" ,lugar:"Japon", precio: 3000},
    ]
    
    function validacion(){
        usuario= prompt("ingrese un usuario de 5 a 10 digitos:")
        password=parseInt(prompt("ingrese un pasword (debe ser numerico):"))
        if((usuario.length >= 5 && usuario.length <=10) && Number(password) ){
            return(true)
        }else{
            return(false)
        }
    }
    
    function destinos(){
        pais = prompt("ingrese destino 'C' para cancun, 'P' para playa del carmen, 'J' para japon: ").toUpperCase()
        
        viajes.forEach((obj)=>{
        
            if(obj.id === pais){
                costo = obj.precio
                data= obj.id
            }
            
        });
        return data
    }
    function confirmacion(){
        let confirm=prompt("para confirmar reserva ingrese 'si' caso contrario 'no':")
            if(confirm == "si"){
                return true
            }else{
                return false
            }
    }
    function metodoDePago(costo){
        metodo= prompt("ingrese 'T' para el pago con targeta(con un aumento del 15%) o 'E' para efectivo (descuento del 15%): ").toUpperCase()
        if(metodo== "T" || metodo== "E"){
            aumento=costo*0.15
            if(metodo== "T"){
                costo+= aumento
                alert("eligio el pago con targeta, monto total a pagar es de "+ costo)
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
    for(let i=1; i<=3; i++){
        alert("bienvenido a tu agencia de viajes \npara seleccionar destino ingrese su usuario y contraseña \n tiene 3 intentos")
        let ingresar=validacion();
        if(ingresar){
            alert("bienvenido ahora seleccione su destino")
            while(true){
                let opcion=prompt("si desea ver los destinos ingrese 'ver' \n para salir 'salir': ")
                if(opcion=="ver"){
                    let destino= destinos(data)
                    if(destino == "J" || destino == "C" || destino == "P"){
                        let pagos=metodoDePago(costo)
                        if(pagos){
                            alert("felicidades su reserva a sido generada")
                        }else{
                            alert("volviendo a meno principal")
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





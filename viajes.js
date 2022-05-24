document.addEventListener('DOMContentLoaded', function() {
    let costo=0
    let metodo
    let aumento
    
    function validacion(usuario,password){
        usuario= prompt("ingrese un usuario de 5 a 10 digitos:")
        password=parseInt(prompt("ingrese un pasword (debe ser numerico):"))
        if((usuario.length >= 5 && usuario.length <=10) && Number(password) ){
            return(true)
        }else{
            return(false)
        }
    }
    function Destinos(lugares){
        lugares=prompt("destino: japon=J, cuba=C, india=I")
        if(lugares== "J"){
            costo=2000
            alert('el valor del viaje es de '+ costo +"$") 
            return ("J")
        }else if(lugares== "C"){
            costo=2500
            alert('el valor del viaje es de '+ costo +"$")
            return ("C")
        }else if(lugares== "I"){
            costo=3000
            alert('el valor del viaje es de '+ costo +"$")
            return("I")
        }else{
            alert("ingrese datos correctos")
        }
    }
    function metododepago(costo){
        metodo= prompt("ingrese 'T' para el pago con targeta(con un aumento del 15%) o 'E' para efectivo (descuento del 15%): ")
        if(metodo== "T"){
            aumento=costo*0.15
            costo+= aumento
            alert("eligio el pago con targeta, monto total a pagar es de "+ costo)
            confirmacion=prompt("para confirmar reserva ingrese 'si' caso contrario 'no':")
            if(confirmacion== "si"){
                return true
            }else{
                return false
            }
        }else if(metodo == "E"){
            descuento=costo*0.15
            costo-= descuento
            alert("el costo en efectivo es de " + costo)
            confirmacion=prompt("para confirmar reserva ingrese 'si' caso contrario 'no':")
            if(confirmacion== "si"){
                return true
            }else{
                return false
            }
        }else{
            alert("ingrese dato correcto")
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
                    let destino= Destinos()
                    if(destino == "J" || destino == "C" || destino == "I"){
                        let pagos=metododepago(costo)
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


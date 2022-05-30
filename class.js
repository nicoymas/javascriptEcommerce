//class Reserva{
//    constructor(nombre,apellido,documento,pago){
//        this.nombre=nombre;
//        this.apellido=apellido;
//        this.documento=documento;
//        this.pago=pago;
//        this.destino=[];
//        
//        
//    }
//    agregarDestino(viajes){
//        this.destino.push(viajes);
//    }
//    obtenerDestino(region){
//        return this.destino.find((viajes)=>(viajes.region==region));
//    }
//}

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

class host{
    constructor(hotel,dormitorios,dias){
        this.hotel = hotel;
        this.dormitorios=dormitorios;
        this.dias=dias;
    }
    mishost(){
        return this.hotel;
    }
    
}
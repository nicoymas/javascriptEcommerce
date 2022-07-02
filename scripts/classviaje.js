
export class Viaje{
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



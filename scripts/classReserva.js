export class Reserva{
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
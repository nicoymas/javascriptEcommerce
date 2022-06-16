export class User{
    constructor(user,pass){
        this.user=user
        this.pass=pass
    }

    validar(usuario,contrasena){
       return  (this.user == usuario && this.pass == contrasena)
    }
}

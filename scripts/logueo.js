
import * as clases  from "./classusuario.js"

//guardar usuario en localstorage    
let boton=document.getElementById("botonsubmit");
const form=document.getElementById("form");
boton.addEventListener("click",(e)=>{
    
    
    e.preventDefault();      
    const datosUsuario={usuario :document.getElementById("form")[0].value, pasword: document.getElementById("form")[1].value}
    


    if(((datosUsuario.usuario).length >= 5 && (datosUsuario.usuario).length <=10) && ((datosUsuario.pasword).length >=5)){
        localStorage.setItem('usuariosguardados',JSON.stringify(datosUsuario)) ;
        Swal.fire({
            title: 'su registro fue un exito',
            confirmButtonText: 'continuar a pagina',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        }).then((result) => {   
            if (result.isConfirmed) {
                window.location.href="index.html";
            }
            
        })
        const users=JSON.parse(localStorage.getItem('users')) || [];
        users.push(datosUsuario)

        localStorage.setItem('users', JSON.stringify(users));
        const userguardados=JSON.parse(localStorage.getItem("usuariosguardados"))
        const usuarios= new clases.User();
        usuarios.agregarusuario({datosUsuario})
       
        // for(const objeto of userguardados){
        //      usuarios.push(new clases.User(objeto));
        // };
        
        form.innerHTML= `<button class="btn btn-primary" > <a href="index.html" style="color:rgb(23, 66, 158)">ingresar</a>
        </button>`
        
    }

})  


    





// const busqueda=JSON.parse(localStorage.getItem("users"));
// console.log(busqueda)
// const borrar=document.getElementById("eliminar");
// const usearelim=document.getElementById("username2")
// const encontrado=busqueda.find((el)=> el.usuario == usearelim.value)
// console.log(encontrado)


// borrar.addEventListener("click",(e)=>{
//     e.preventDefault();
//     for(const data of busqueda){
//         if(data.usuario== usearelim){
//             const indice=busqueda.indexOf(data.usuario);
//             busqueda.splice(indice)
//         }   
//     }   
// })

// se importa classe usuario
import * as clases  from "./classusuario.js"

//--------->Gestion de usuarios<---------

// por defecto se crea un Admin    
const Admin={usuario:"Admin",pasword:"Admin"}
const UsuariosInLocal=JSON.parse(localStorage.getItem("users")) || [];
if(UsuariosInLocal.length==0){
  localStorage.setItem("users",JSON.stringify([Admin]));
  
}

const BtnRegistro=document.getElementById("BtnRegistro");
const FormRegistro=document.getElementById("FormRegistro");

BtnRegistro.addEventListener("click",(e)=>{
  e.preventDefault();     
  //tomamos los datos ingresados en el formulario y se corrobora de que no exista ese usuario 
  const DatosIngresados={usuario :document.getElementById("FormRegistro")[0].value, pasword: document.getElementById("FormRegistro")[1].value}
  const ChecklocalStorage=UsuariosInLocal.find((el)=> el.usuario == DatosIngresados.usuario)
  // si no se encuentra ese usuario se crea uno nuevo
  if(ChecklocalStorage == undefined){
    // una pequeña coondicion para que el usuario no se llene con espacios en blanco o menores a cierta cantidad de caracteres
    if(((DatosIngresados.usuario).length >= 5 && (DatosIngresados.usuario).length <=10) && ((DatosIngresados.pasword).length >=5)){
      // libreria sweet alert para mostrar un mensaje de confirmacion
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
            //  nos redirige a la pagina de inicio 
            if (result.isConfirmed) {
              window.location.href="index.html";
            }
            
        })
        // se crea un nuevo usuario y se carga al localStorage
        UsuariosInLocal.push(DatosIngresados)
        localStorage.setItem('users', JSON.stringify(UsuariosInLocal));
        //lo mismo hacemos con las clases
        const GuardarUser= new clases.User();
        GuardarUser.agregarusuario({DatosIngresados})
        //en caso de tener una cuenta puede ingresar directamente para loguearse
        FormRegistro.innerHTML= `<button class="btn btn-primary" > <a href="index.html" style="color:rgb(23, 66, 158)">ingresar</a>
        </button>`
        
    }else{
        Swal.fire({
            title: 'error',
            text: 'los campos deben tener minimo 5 caracteres',
            icon: 'error',
            confirmButtonText: 'continuar',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }
  }else{
    Swal.fire({
      title: 'error',
      text: 'ese nombre de usuario ya existe, pruebe con otro',
      icon: 'error',
      confirmButtonText: 'continuar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
  })
  }
})  



    






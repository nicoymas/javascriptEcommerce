
import * as clases  from "./classusuario.js"

    
let boton=document.getElementById("botonsubmit");
const form=document.getElementById("form");
boton.addEventListener("click",(e)=>{
    
    
    e.preventDefault();      
    const nombre=[
        {usuario :document.getElementById("form")[0].value, pasword: document.getElementById("form")[1].value}
    ];
    
    
    if(((nombre[0].usuario).length >= 5 && (nombre[0].usuario).length <=10) && (nombre[0].pasword).length >=5)
        localStorage.setItem("usuariosguardados",JSON.stringify(nombre));
        const userguardados=JSON.parse(localStorage.getItem("usuariosguardados"));
        const usuarios= [];
        for(const objeto of userguardados){
             usuarios.push(new clases.User(objeto));
        };
        form.innerHTML= `<button class="btn btn-primary" > <a href="index.html" style="color:rgb(23, 66, 158)">ingresar</a></button>`
        


})  


    

    
  



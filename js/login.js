let users = ["Ana", "Beto", "Carlos", "Daniel"];
let passwords = ["usuario1", "usuario2", "usuario3", "usuario4"];
let saldos = [10000, 35000, 8000, 15500];
let saldoNombreString = "saldo-";

function matchUserPassword(){
    let userInput = document.getElementById("user").value;
    let passwordInput = document.getElementById("password").value;
    let login = false;
    for(let i = 0; i<users.length; i++){
        if(userInput===users[i] && passwordInput===passwords[i]){
            login = true;
            localStorage.setItem("usuario", userInput);
            saldoNombreString = "saldo-" + userInput.toString();
            localStorage.setItem("saldo-usuario", saldoNombreString);
            if(localStorage.getItem(saldoNombreString)==null){
                localStorage.setItem(saldoNombreString, saldos[i].toString());
            }
            break;
        }
    }
    if(login==true){
        window.open("main.html", "_self")
    }else{
        document.getElementById("error").innerHTML = "Hay un error en el usuario y/o contraseña."
    }
}


document.getElementById("loginButton").addEventListener("click", matchUserPassword);

document.getElementById("password").addEventListener("keyup", function(event){
    if(event.key=="Enter"){
        document.getElementById("loginButton").click();
    }
})
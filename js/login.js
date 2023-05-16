let users = ["Ana", "Beto", "Carlos", "Daniel"];
let passwords = ["usuario1", "usuario2", "usuario3", "usuario4"];
let saldos = [10000, 35000, 8000, 15500];

function matchUserPassword(){
    let userInput = document.getElementById("user").value;
    let passwordInput = document.getElementById("password").value;
    let login = false;
    for(let i = 0; i<users.length; i++){
        if(userInput===users[i] && passwordInput===passwords[i]){
            login = true;
            localStorage.setItem("usuario", userInput);
            localStorage.setItem("saldo", saldos[i].toString());
            break;
        }
    }
    if(login==true){
        window.open("index.html", "_self")
    }else{
        document.getElementById("error").innerHTML = "El usuario y contraseña no coinciden."
    }
}


document.getElementById("loginButton").addEventListener("click", matchUserPassword);
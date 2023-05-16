user = localStorage.getItem("usuario");
saldo = parseFloat(localStorage.getItem("saldo"));

document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + user;
document.getElementById("tuSaldo").innerHTML = "Tu saldo es " + saldo;
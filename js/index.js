user = localStorage.getItem("usuario");
saldo = parseFloat(localStorage.getItem("saldo"));

document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + user;
document.getElementById("tuSaldo").innerHTML = "Tu saldo es " + saldo;

const maxNumDepositos = 4;
const maxNumRetiros = 5;
const maxValorDepositos = 50000;
const maxValorRetiros = 30000;

let numDepositos = 0;
let numRetiros = 0;
let valorDepositosAcumulado = 0;
let valorRetirosAcumulado = 0;


function actualizarDatos(){
    document.getElementById("tuSaldo").innerHTML = "Tu saldo es " + saldo;
}

function hacerDeposito(){
    if(numDepositos>=maxNumDepositos){
        alert("Has excedido los " + maxNumDepositos + " depósitos diarios permitidos")
    }else{
        let valorADepositar = parseFloat(document.getElementById("deposito").value);
        if(valorDepositosAcumulado+valorADepositar>maxValorDepositos){
            alert("No puedes depositar más de " + maxValorDepositos + " al día")
        }else{
            valorDepositosAcumulado += valorADepositar;
            saldo +=valorADepositar;
            numDepositos++;
            actualizarDatos();
            alert("Depósito realizado exitosamente");
        }
    }
}

document.getElementById("depositar").addEventListener("click", hacerDeposito);
document.getElementById("retirar").addEventListener("click", hacerRetiro);
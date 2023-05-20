let user = localStorage.getItem("usuario");
let saldoUsuario = localStorage.getItem("saldo-usuario").toString()
let saldo = parseFloat(localStorage.getItem(saldoUsuario));
let saldoUsuario1 = localStorage.getItem("saldo-usuario-1").toString()
let saldo1 = parseFloat(localStorage.getItem(saldoUsuario1));
let saldosArray = [saldo, saldo1];
let saldosUsuarioArray = [saldoUsuario, saldoUsuario1];

document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + user;
document.getElementById("tuSaldo0").innerHTML = "$" + saldo + " MXN";
document.getElementById("tuSaldo1").innerHTML = "$" + saldo1 + " MXN";

const maxNumDepositos = 4;
const maxNumRetiros = 5;
const maxValorDepositos = 50000;
const maxValorRetiros = 30000;

let numDepositos = 0;
let numRetiros = 0;
let valorDepositosAcumulado = 0;
let valorRetirosAcumulado = 0;


function actualizarDatos(numId){
    document.getElementById("tuSaldo" + numId).innerHTML = "$" + saldosArray[numId] + " MXN";
    localStorage.setItem(saldosUsuarioArray[numId], saldosArray[numId].toString());
}

function cancelarDeposito(numId){
    document.getElementById("textDepositar" + numId).style.fontWeight = "normal";
    document.getElementById("desplegarDeposito" + numId).style.display = "none";
}

function cancelarRetiro(numId){
    document.getElementById("textRetirar" + numId).style.fontWeight = "normal";
    document.getElementById("desplegarRetiro" + numId).style.display = "none";
}

function cancelarHistorial(numId){
    if(document.getElementById("textHistorial" + numId).classList.contains("bold-text")){
        document.getElementById("textHistorial" + numId).classList.toggle("bold-text");
        document.getElementById("desplegarHistorial" + numId).classList.toggle("historial-show");
    }
}

function guardarHistorial(cantidad, descripcion, numId){
    document.getElementById("noHistorial" + numId).style.display = "none";
    let textoMonto = document.getElementById("montoHistorial" + numId);
    let textoDescripcion = document.createElement("p");
    let textoHora = document.createElement("p");
    let textoCantidad = document.createElement("p");

    textoDescripcion.textContent = descripcion;
    textoHora.textContent = new Date().toLocaleString();
    textoCantidad.textContent = "$" + cantidad + " MXN";

    if(descripcion=="Depósito"){
        textoCantidad.style.color = "green";
    }else{
        textoCantidad.style.color = "red";
    }

    textoMonto.parentNode.appendChild(textoDescripcion);
    textoMonto.parentNode.appendChild(textoHora);
    textoMonto.parentNode.appendChild(textoCantidad);
}

function hacerDeposito(numId){
    if(numDepositos>=maxNumDepositos){
        alert("Ya has realizado los " + maxNumDepositos + " depósitos diarios permitidos")
    }else{
        let valorADepositar = parseFloat(document.getElementById("deposito" + numId).value);
        if(valorDepositosAcumulado+valorADepositar>maxValorDepositos){
            alert("No puedes depositar más de " + maxValorDepositos + " al día")
        }else{
            valorDepositosAcumulado += valorADepositar;
            saldosArray[numId] +=valorADepositar;
            numDepositos++;
            actualizarDatos(numId);
            guardarHistorial(valorADepositar, "Depósito", numId);
            alert("Depósito realizado exitosamente");
        }
    }
    cancelarDeposito(numId);
}

function hacerRetiro(numId){
    if(numRetiros>=maxNumRetiros){
        alert("Ya has realizado los " + maxNumRetiros + " retiros diarios permitidos")
    }else{
        let valorARetirar = parseFloat(document.getElementById("retiro" + numId).value);
        if(valorRetirosAcumulado+valorARetirar>maxValorRetiros){
            alert("No puedes retirar más de " + maxValorRetiros + " al día")
        }else if(saldosArray[numId]<valorARetirar){
            alert("No dispones de suficiente saldo para realizar esta operación")
        }else{
            valorRetirosAcumulado += valorARetirar;
            saldosArray[numId] -=valorARetirar;
            numRetiros++;
            actualizarDatos(numId);
            guardarHistorial(valorARetirar, "Retiro", numId);
            alert("Retiro realizado exitosamente");
        }
    }
    cancelarRetiro(numId);
}

let cantidadTarjetas = 2;

function agregarEventosBotones(num){
    for(let j = 0; j < num; j++){
        let i = j.toString();
        document.getElementById("depositar" + i).addEventListener("click", function(){
            hacerDeposito(i);
        });

        document.getElementById("retirar" + i).addEventListener("click", function(){
            hacerRetiro(i);
        });

        document.getElementById("textDepositar" + i).addEventListener("click", function(){
            document.getElementById("textDepositar" + i).style.fontWeight = "bold";
            document.getElementById("desplegarDeposito" + i).style.display = "flex";
            cancelarRetiro(i);
            cancelarHistorial(i);
        })
        
        document.getElementById("cancelarDeposito" + i).addEventListener("click", function(){
            cancelarDeposito(i);
        })
        
        document.getElementById("textRetirar" + i).addEventListener("click", function(){
            document.getElementById("textRetirar" + i).style.fontWeight = "bold";
            document.getElementById("desplegarRetiro" + i).style.display = "flex";
            cancelarDeposito(i);
            cancelarHistorial(i);
        })
        
        document.getElementById("cancelarRetiro" + i).addEventListener("click", function(){
            cancelarRetiro(i);
        });
        
        document.getElementById("textHistorial" + i).addEventListener("click", function(){
            document.getElementById("textHistorial" + i).classList.toggle("bold-text");
            document.getElementById("desplegarHistorial" + i).classList.toggle("historial-show");
            cancelarDeposito(i);
            cancelarRetiro(i);
        });
    }
}

document.addEventListener("DOMContentLoaded", function(){
    agregarEventosBotones(cantidadTarjetas);
})

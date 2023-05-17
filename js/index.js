user = localStorage.getItem("usuario");
saldo = parseFloat(localStorage.getItem("saldo"));

document.getElementById("bienvenida").innerHTML = "Bienvenido/a " + user;
document.getElementById("tuSaldo").innerHTML = "$" + saldo + " MXN";

const maxNumDepositos = 4;
const maxNumRetiros = 5;
const maxValorDepositos = 50000;
const maxValorRetiros = 30000;

let numDepositos = 0;
let numRetiros = 0;
let valorDepositosAcumulado = 0;
let valorRetirosAcumulado = 0;


function actualizarDatos(){
    document.getElementById("tuSaldo").innerHTML = "$" + saldo + " MXN";
}

function cancelarDeposito(){
    document.getElementById("textDepositar").style.fontWeight = "normal";
    document.getElementById("desplegarDeposito").style.display = "none";
}

function cancelarRetiro(){
    document.getElementById("textRetirar").style.fontWeight = "normal";
    document.getElementById("desplegarRetiro").style.display = "none";
}

function cancelarHistorial(){
    if(document.getElementById("textHistorial").classList.contains("bold-text")){
        document.getElementById("textHistorial").classList.toggle("bold-text");
        document.getElementById("desplegarHistorial").classList.toggle("historial-show");
    }
}

function guardarHistorial(cantidad, descripcion){
    document.getElementById("noHistorial").style.display = "none";
    let textoMonto = document.getElementById("montoHistorial");
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

function hacerDeposito(){
    if(numDepositos>=maxNumDepositos){
        alert("Ya has realizado los " + maxNumDepositos + " depósitos diarios permitidos")
    }else{
        let valorADepositar = parseFloat(document.getElementById("deposito").value);
        if(valorDepositosAcumulado+valorADepositar>maxValorDepositos){
            alert("No puedes depositar más de " + maxValorDepositos + " al día")
        }else{
            valorDepositosAcumulado += valorADepositar;
            saldo +=valorADepositar;
            numDepositos++;
            actualizarDatos();
            guardarHistorial(valorADepositar, "Depósito");
            alert("Depósito realizado exitosamente");
        }
    }
    cancelarDeposito();
}

function hacerRetiro(){
    if(numRetiros>=maxNumRetiros){
        alert("Ya has realizado los " + maxNumRetiros + " retiros diarios permitidos")
    }else{
        let valorARetirar = parseFloat(document.getElementById("retiro").value);
        if(valorRetirosAcumulado+valorARetirar>maxValorRetiros){
            alert("No puedes retirar más de " + maxValorRetiros + " al día")
        }else if(saldo<valorARetirar){
            alert("No dispones de suficiente saldo para realizar esta operación")
        }else{
            valorRetirosAcumulado += valorARetirar;
            saldo -=valorARetirar;
            numRetiros++;
            actualizarDatos();
            guardarHistorial(valorARetirar, "Retiro");
            alert("Retiro realizado exitosamente");
        }
    }
    cancelarRetiro();
}

document.getElementById("depositar").addEventListener("click", hacerDeposito);
document.getElementById("retirar").addEventListener("click", hacerRetiro);

document.getElementById("textDepositar").addEventListener("click", function(){
    document.getElementById("textDepositar").style.fontWeight = "bold";
    document.getElementById("desplegarDeposito").style.display = "flex";
    cancelarRetiro();
    cancelarHistorial();
})

document.getElementById("cancelarDeposito").addEventListener("click", cancelarDeposito)

document.getElementById("textRetirar").addEventListener("click", function(){
    document.getElementById("textRetirar").style.fontWeight = "bold";
    document.getElementById("desplegarRetiro").style.display = "flex";
    cancelarDeposito();
    cancelarHistorial();
})

document.getElementById("cancelarRetiro").addEventListener("click", cancelarRetiro);

document.getElementById("textHistorial").addEventListener("click", function(){
    document.getElementById("textHistorial").classList.toggle("bold-text");
    document.getElementById("desplegarHistorial").classList.toggle("historial-show");
    cancelarDeposito();
    cancelarRetiro();
});
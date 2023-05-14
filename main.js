//Creación de un alquiler de autos basado en si es un cliente externo o por aseguradora. Si entra por aseguradora el cliente tiene un 25% de descuento


//El valor del día de alquiler está seteado por igual
// const valorDia = 350000

//Menú de opciones para el cliente
function menu(){
    let opcionesMenu = parseInt(prompt("1.Crear cliente \n2.Crear alquiler"));
    return opcionesMenu;
}

//Base de vehiculos
class Vehiculo{
    constructor(id,marca,modelo,anio,kilometraje,valorDia){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.kilometraje = kilometraje;
        this.valorDia = valorDia;
    }
}
//Base de datos de vehículos
    let vehiculo1 = new Vehiculo(1,"Ford","Escape",2022,25000,10000);
    let vehiculo2 = new Vehiculo(2,"Mazda","CX5",2023,5420,130000);
    let vehiculo3 = new Vehiculo(3,"Toyota","4Runner",2018,53200,150000);
    let vehiculo4 = new Vehiculo(4,"Mercedes Benz","GLC200",2021,3500,250000);
    let vehiculo5 = new Vehiculo(5,"Audi","Q5",2020,26250,130000);
    let vehiculo6 = new Vehiculo(6,"BMW","X5",2019,27500,160000);
    let vehiculo7 = new Vehiculo(7,"Volvo","XC60",2018,27500,120000);

//Se muestra por consola en forma de tabla el inventario de vehiculos
    let vehiculos = [vehiculo1,vehiculo2,vehiculo3,vehiculo4,vehiculo5,vehiculo6,vehiculo7];
    console.table(vehiculos);
    
    class Cliente {
        constructor(dni, nombre, edad, asegurado){
            this.dni = parseInt(dni);
            this.nombre = nombre;
            this.edad = parseInt(edad);
            this.asegurado = asegurado;
        }
    }

//Tengo un array con datos de clientes anteriores
let cliente1 = new Cliente(12345,"Luis", 33, "si");
let cliente2 = new Cliente(55322,"Juan", 18, "no");
let cliente3 = new Cliente(54135,"Pedro", 44, "si");
let cliente4 = new Cliente(56875,"Maria", 53, "si");
let cliente5 = new Cliente(45345,"Patricia", 25, "no");

const listaClientes = [cliente1,cliente2,cliente3,cliente4,cliente5];

// Muestra por consola la información del array en formato de tabla
console.table(listaClientes);

function ingresoCliente() {
    //Pide los datos al usuario para definirlo como cliente
    let dni = parseInt(prompt('Ingrese el DNI del cliente').trim());
    //Se valida que los caracteres ingresados sean numeros y que el usuario sea nuevo
    while(isNaN(dni) || listaClientes.find((dniCliente) => dniCliente.dni === dni)){
        if (listaClientes.find(dniCliente => dniCliente.dni === dni)){
        alert('El usuario ya se encuentra registrado');
        dni = prompt('Ingrese el DNI del cliente');
        }else if (isNaN(dni)){
        alert("El valor ingresado debe ser un número");
        dni = prompt('Ingrese el DNI del cliente');
        }else
        dni = prompt('Ingrese el DNI del cliente');
    }

    let nombre = prompt('Ingrese el nombre del cliente');
    //Se valida que el nombre contenga por lo menos 3 caracteres, puede ser alfa numérico
    while(nombre.trim().length < 3){
        alert('El nombre debe contener por lo menos 3 caracteres');
        nombre = prompt('Ingrese el nombre del cliente');
    }

    let edad = prompt('Ingrese la edad del cliente');
    //Se valida que la edad sea un numero y esté dentro de un rango establecido
    while(parseInt(edad) < 18 || parseInt(edad) > 55 || isNaN(edad)){
        alert('La edad debe ser mayor a 18 y menor a 55 o no ingresaste un número');
        edad = prompt('Ingrese la edad del cliente');
    };

    let asegurado = prompt('El cliente es asegurado? (si o no)').toLowerCase();
    //Se valida que el usuario ingrese solamente valores de 'si' o 'no'
    while(asegurado !== 'si' && asegurado !== 'no'){
        alert('Solo se admiten valores si o no');
        asegurado = prompt('El cliente es asegurado? (si o no)').toLowerCase();
    }

    const nuevoCliente = new Cliente(dni, nombre, edad, asegurado);
    listaClientes.push(nuevoCliente);
    console.table(listaClientes);
}
let listaAlquileres = []

//Base alquileres
class Alquiler{
    constructor(dni,vehiculo,valorDia,dias){
        this.dni = parseInt(dni);
        this.vehiculo = vehiculo;
        this.valorDia = valorDia;
        this.dias = parseInt(dias);
    }
}
function crearAlquiler() {
    let dni = parseInt(prompt('Ingrese el DNI del cliente'));
    while(isNaN(dni)){
        if (isNaN(dni)){
            alert("El valor ingresado debe ser un número");
        }else dni = prompt('Ingrese el DNI del cliente');
    }
    let clienteAlquiler = listaClientes.find(dniCliente => dniCliente.dni === dni);
    if (clienteAlquiler){
        let nombreClienteAlquiler = clienteAlquiler.nombre; 
        alert(`Bienvenido ${nombreClienteAlquiler} :)`);
    }else{
        alert("El cliente no existe en la base de datos, cree uno a continuación");
        ingresoCliente();
    }
    const pluck = (vehiculos) => vehiculos.map(({marca, modelo, valorDia}) => ({marca, modelo, valorDia}));
    let escogeVehiculo = parseInt(prompt(`Ingrese el número del vehículo que desea alquilar: \n
    ${pluck(vehiculos).map(({marca, modelo, valorDia}, index) => `${index + 1}. ${marca} ${modelo} - $${valorDia}/día`).join('\n')}
    `));
    let diasAlquiler = parseInt(prompt("Cuántos días va a utilizar el vehículo?"))
    let valorDia = vehiculos[escogeVehiculo-1].valorDia;

    //Se calcula el precio y aplica el descuento del 25% si el cliente es asegurado
    function precioAlquiler(valorDia, diasAlquiler, asegurado) {
        let precioTotal = valorDia * diasAlquiler;
        if (asegurado === "si") {
          precioTotal *= 0.75;
        }
        return precioTotal;
      }
    
      const precioTotal = precioAlquiler(valorDia, diasAlquiler, clienteAlquiler.asegurado);

    const nuevoAlquiler = new Alquiler (dni,escogeVehiculo,valorDia,diasAlquiler);
    listaAlquileres.push(nuevoAlquiler)
    console.table(listaAlquileres)

    
    console.log(`Gracias por su alquiler, ${clienteAlquiler.nombre}. \n El precio a pagar es $${precioTotal} para ${diasAlquiler} días de alquiler del vehículo ${vehiculos[escogeVehiculo-1].marca} ${vehiculos[escogeVehiculo-1].modelo}`)
}



let navega = menu();
switch(navega) {
    case 1:
        ingresoCliente();
        break;
    case 2:
        crearAlquiler();
        break;
    default:
        alert('Opción no válida');
}
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');
const rl = readline.createInterface({ input: stdin, output: stdout });
 
const Inventario = require('./inventario');
const Proveedores = require('./proveedores');
 
const inventario = new Inventario();
const proveedores = new Proveedores();
 
async function login() {
    console.log('=== AgroTech (versión terminal) ===');
    const usuario = await rl.question('Usuario: ');
    const clave = await rl.question('Contraseña: ');
    return usuario === 'admin' && clave === '1234';
}
 
async function menuInventario() {
    let volver = false;
 
    while (!volver) {
        console.log('\n--- Inventario ---');
        console.log('1. Agregar producto');
        console.log('2. Listar productos');
        console.log('3. Eliminar producto');
        console.log('4. Volver');
 
        const opcion = await rl.question('Elige una opción: ');
 
        if (opcion === '1') {
            const producto = await rl.question('Producto: ');
            const categoria = await rl.question('Categoría: ');
            const stock = await rl.question('Stock: ');
            await inventario.agregar({ producto, categoria, stock: Number(stock) || 0 });
 
        } else if (opcion === '2') {
            await inventario.listar();
 
        } else if (opcion === '3') {
            const id = await rl.question('ID a eliminar: ');
            await inventario.eliminar(Number(id));
 
        } else if (opcion === '4') {
            volver = true;
 
        } else {
            console.log('Opción inválida');
        }
    }
}
 
async function menuProveedores() {
    let volver = false;
 
    while (!volver) {
        console.log('\n--- Proveedores ---');
        console.log('1. Agregar proveedor');
        console.log('2. Listar proveedores');
        console.log('3. Eliminar proveedor');
        console.log('4. Volver');
 
        const opcion = await rl.question('Elige una opción: ');
 
        if (opcion === '1') {
            const nombre = await rl.question('Nombre: ');
            const producto = await rl.question('Producto: ');
            const telefono = await rl.question('Teléfono: ');
            await proveedores.agregar({ nombre, producto, telefono });
 
        } else if (opcion === '2') {
            await proveedores.listar();
 
        } else if (opcion === '3') {
            const id = await rl.question('ID a eliminar: ');
            await proveedores.eliminar(Number(id));
 
        } else if (opcion === '4') {
            volver = true;
 
        } else {
            console.log('Opción inválida');
        }
    }
}
 async function calcularPrecio() {
    const costo = parseFloat(await rl.question('Costo del producto: '));
    const ganancia = parseFloat(await rl.question('Ganancia (%): '));
 
    if (isNaN(costo) || isNaN(ganancia)) {
        console.log('Ingresa números válidos');
        return;
    }
 
    const precioFinal = costo + (costo * ganancia / 100);
    console.log(`Precio final: $${precioFinal.toFixed(2)}`);
}
 
async function menuPrincipal() {
    let salir = false;
 
    while (!salir) {
        console.log('\n=== Menú Principal ===');
        console.log('1. Inventario');
        console.log('2. Proveedores');
        console.log('3. Precios');
        console.log('4. Salir');
 
        const opcion = await rl.question('Elige una opción: ');
 
        if (opcion === '1') {
            await menuInventario();
        } else if (opcion === '2') {
            await menuProveedores();
        } else if (opcion === '3') {
            await calcularPrecio();
        } else if (opcion === '4') {
            salir = true;
        } else {
            console.log('Opción inválida');
        }
    }
}
 
async function main() {
    const acceso = await login();
 
    if (!acceso) {
        console.log('\nUsuario o contraseña incorrectos');
        rl.close();
        return;
    }
 
    console.log('\nBienvenido, admin');
    await menuPrincipal();
 
    console.log('\nHasta luego!');
    rl.close();
}
 
main();
 

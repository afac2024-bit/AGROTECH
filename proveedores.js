const Modulo = require('./modulo');

class Proveedores extends Modulo {

    constructor() {
        super('Proveedores');
    }

    mostrar(item) {
        return `ID: ${item.id} | Nombre: ${item.nombre} | Producto: ${item.producto} | Teléfono: ${item.telefono}`;
    }
}

module.exports = Proveedores;

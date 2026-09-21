const Modulo = require('./modulo');
 
class Inventario extends Modulo {
 
    constructor() {
        super('Inventario', 'Inventario'); 
    }
 
    mostrar(item) {
        return `ID: ${item.id} | Producto: ${item.producto} | Categoría: ${item.categoria} | Stock: ${item.stock}`;
    }
}
 
module.exports = Inventario;
 

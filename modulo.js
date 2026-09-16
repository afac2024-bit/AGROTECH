class Modulo {

    constructor(nombre) {
        this.nombre = nombre;
        this.datos = [];
    }

    agregar(item) {
        item.id = this.datos.length > 0
            ? this.datos[this.datos.length - 1].id + 1
            : 1;
        this.datos.push(item);
        console.log(`\n${this.nombre}: registro agregado con id ${item.id}`);
    }

    eliminar(id) {
        const existia = this.datos.some(d => d.id === id);
        this.datos = this.datos.filter(d => d.id !== id);

        if (existia) {
            console.log(`\n${this.nombre}: registro ${id} eliminado`);
        } else {
            console.log(`\n${this.nombre}: no existe un registro con id ${id}`);
        }
    }

    listar() {
        console.log(`\n--- ${this.nombre} ---`);

        if (this.datos.length === 0) {
            console.log('(sin registros todavía)');
            return;
        }

        this.datos.forEach(item => console.log(this.mostrar(item)));
    }

    mostrar(item) {
        return JSON.stringify(item);
    }
}

module.exports = Modulo;

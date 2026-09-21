const { poolPromise, sql } = require('./db');
 
class Modulo {
 
    constructor(nombre, tabla) {
        this.nombre = nombre;
        this.tabla = tabla; 
    }
 
    async agregar(item) {
        const pool = await poolPromise;
        const request = pool.request();
        const columnas = Object.keys(item);
 
        columnas.forEach(col => request.input(col, item[col]));
 
        const query = `INSERT INTO ${this.tabla} (${columnas.join(', ')})
                        VALUES (${columnas.map(c => '@' + c).join(', ')})`;
 
        await request.query(query);
        console.log(`\n${this.nombre}: registro agregado`);
    }
 
    async eliminar(id) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM ${this.tabla} WHERE id = @id`);
 
        if (result.rowsAffected[0] > 0) {
            console.log(`\n${this.nombre}: registro ${id} eliminado`);
        } else {
            console.log(`\n${this.nombre}: no existe un registro con id ${id}`);
        }
    }
 
    async listar() {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT * FROM ${this.tabla}`);
 
        console.log(`\n--- ${this.nombre} ---`);
 
        if (result.recordset.length === 0) {
            console.log('(sin registros todavía)');
            return;
        }

        result.recordset.forEach(item => console.log(this.mostrar(item)));
    }
 
    mostrar(item) {
        return JSON.stringify(item);
    }
}
 
module.exports = Modulo;

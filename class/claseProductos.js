const fs = require("fs");

class listaProductos{
    archivoLista = ""

    constructor(nombreArchivoLista) {
        this.archivoLista = `./db/${nombreArchivoLista}.txt`
    }
    
    async getAll(){
        //console.log('--getAll--')
        try{
            const archivo = await fs.promises.readFile(this.archivoLista, 'utf-8')
            const sal = JSON.parse(archivo)

            return sal
        } catch (error) {
            if (error.code === 'ENOENT'){
                await fs.promises.writeFile(this.archivoLista, JSON.stringify([], null, 3))
                return [];
            }
            console.log('ERROR en getAll: ', error)
        }
    }
    
    async getById(numId){
        try{
            //cargo la lista
            const lista = await this.getAll()

            const productoEncontrado = lista.find(item => item.id == numId)
            
            if (!productoEncontrado)
                return null

            return productoEncontrado
        } catch(error) {
            console.log('ERROR en getById: ', error)
        }
    }

    async save(objProducto){
        //console.log('--save--')
        try{
            //cargo la lista
            const lista = await this.getAll()
            let nId = this.lastId(lista) + 1

            objProducto.id = nId

            lista.push(objProducto)

            await fs.promises.writeFile(this.archivoLista, JSON.stringify(lista))            
            
            return nId
        } catch (error){
            console.log('ERROR en save: ', error)
        }
    }

    async deleteById(numId) {
        try{
            //cargo la lista
            const lista = await this.getAll()

            const productoEncontrado = lista.find(item => item.id == numId)
            
            if (!productoEncontrado)
                return 'Producto no encontrado!!!'
            
            const listaFiltrada = lista.filter(item => item.id != numId)
            await fs.promises.writeFile(this.archivoLista, JSON.stringify(listaFiltrada, null, 3))
            
            return 'Producto eliminado!!!'
        } catch(error) {
            console.log('ERROR en getById: ', error)
        }
    }

    async deleteAll() {
        try {
          await fs.promises.writeFile(this.archivoLista, JSON.stringify([], null, 3));
        } catch (error) {
          console.log(error);
        }
    }

    lastId(lista){
        try{
            let vId = 0
            lista.forEach(producto => {
                if (producto.id > vId)
                    vId = producto.id
            });
            return vId
        } catch(error){
            console.log('ERROR en lastId: ', error)
        }
    }
}

module.exports = listaProductos
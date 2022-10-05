const listaProductos = require("./class/claseProductos.js");
const express = require('express');

const app = express();
const PORT = 8080;

const productos = new listaProductos('productos');

const randomFunction = (limite) => {
    return parseInt(Math.random() * limite) + 1
};

app.get('/productos', (req, res) => {
    console.log('entro en productos')
    productos.getAll()
        .then(lista => {
            JSON.stringify(lista)
            console.log(lista)
            res.send(JSON.stringify(lista, null, 3))
        })
});

app.get('/productoRandom', (req, res) => {
    console.log('entro en productoRandom')
    productos.getAll()
        .then((lista =>
            lista[randomFunction(lista.length)]
        ))
        .then(itemLista =>
            res.send(JSON.stringify(itemLista, null, 3))
        )
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
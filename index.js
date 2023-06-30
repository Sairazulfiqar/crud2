// index.js
const express = require('express');
const app = express();
const port = 3000;

const db = require('./db1');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Obtener todos los productos
app.get('/listaproductos', (req, res) => {
    db.query('SELECT * FROM productos', (error, results) => {
        if (error) throw error;
        res.render('indexproductos', { productos: results });
    });
});

app.get('/', (req, res) => {
        res.render('home', (''));
    });


// Mostrar formulario para agregar un producto
app.get('/agregarproducto', (req, res) => {
    res.render('agregarproducto');
});

// Agregar un producto a la base de datos
app.post('/agregarproducto', (req, res) => {
    const { nombre, precio,stock } = req.body;
    db.query('INSERT INTO productos SET ?', { nombre,precio, stock}, (error, result) => {
        if (error) throw error;
        res.redirect('/agregarproducto');
    });
});

// Mostrar formulario para editar un  producto
app.get('/editarproducto/:id', (req, res) => {
    const producto_id = req.params.producto_id;
    db.query('SELECT * FROM productos WHERE id = ?', producto_id, (error, result) => {
        if (error) throw error;
        res.render('editarproducto', { productos: result[0] });
    });
});

// Actualizar un usuario en la base de datos
app.post('/editarproducto/:id', (req, res) => {
    const id = req.params.id;
    const { nombre,precio, stock } = req.body;
    db.query('UPDATE prodcutos SET nombre = ?, precio = ?, stock = ?, WHERE id = ?', [producto_id,nombre, precio, stock,], (error, result) => {
        if (error) throw error;
        res.redirect('/listaproductos');
    });
});

// Eliminar un usuario de la base de datos
app.get('/eliminarproducto/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM productos WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        res.redirect('/listaproductos');
    });
});

// Obtener todos los fabricantes
app.get('/listafabricantes', (req, res) => {
    db.query('SELECT * FROM fabricantes', (error, results) => {
        if (error) throw error;
        res.render('indexfabricantes', { fabricantes: results });
    });
});

// Mostrar formulario para agregar un fabricante
app.get('/agregarfabricante', (req, res) => {
    res.render('agregarfabricante');
});

// Agregar un fabricante a la base de datos
app.post('/agregarfabricante', (req, res) => {
    const { fabricante_id, nombre} = req.body;
    db.query('INSERT INTO fabricantes SET ?', { fabricante_id, nombre}, (error, result) => {
        if (error) throw error;
        res.redirect('/agregarfabricante');
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
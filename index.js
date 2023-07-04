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
        nombre = "";
        if (error) throw error;
        res.render('indexproductos', { nombre, productos: results });
    });
});

app.get('/', (req, res) => {
        res.render('home', (''));
    });

// Obtener todos los productos por fabricante
app.get('/listarprodfab/:id/:nombre', (req, res) => {
    const id = req.params.id;
    const nombre = req.params.nombre;
    db.query('SELECT * FROM productos WHERE fabricante = ?', id, (error, results) => {
        if (error) throw error;
        res.render('indexproductos', { nombre, productos: results });
    });
});

// Obtener todas las categorias por producto
app.get('/listarprodcat/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM productos WHERE categoria = ?', id, (error, results) => {
        if (error) throw error;
        nombre = "";
        res.render('indexproductos', { nombre, productos: results });
    });
});

app.get('/', (req, res) => {
        res.render('home', (''));
    });

//Orden descendente
app.get('/listaproductos', (req, res) => {
    db.query('SELECT * FROM productos ORDER BY nombre DESC', (error, results) => {
        if (error) throw error;
        res.render('/listaproductos', { productos: results });
    });
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
        res.redirect('/listaproductos');
    });
});

// Mostrar formulario para editar un  producto
app.get('/editarproducto/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM productos WHERE producto_id = ?', id, (error, result) => {
        if (error) throw error;
        res.render('editarproducto', { productos: result[0] });
    });
});

// Actualizar un usuario en la base de datos
app.post('/editarproducto/:id', (req, res) => {
    const id = req.params.id;
    const { nombre,precio, stock } = req.body;
    db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE producto_id = ?', [nombre, precio, stock,id], (error, result) => {
        if (error) throw error;
        res.redirect('/listaproductos');
    });
});

// Eliminar un usuario de la base de datos
app.get('/eliminarproducto/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM productos WHERE producto_id = ?', id, (error, result) => {
        if (error) throw error;
        res.redirect('/listaproductos');
    });
});

// Obtener todos los fabricantes
app.get('/listafabricante', (req, res) => {
    db.query('SELECT * FROM fabricantes', (error, results) => {
        if (error) throw error;
        res.render('indexfabricantes', { fabricantes: results });
    });
});

app.get('/', (req, res) => {
    res.render('home', (''));
});

// Mostrar formulario para agregar un fabricante
app.get('/agregarfabricante', (req, res) => {
    res.render('agregarfabricante');
});

// Agregar un fabricante a la base de datos
app.post('/agregarfabricante', (req, res) => {
    const {id, nombre} = req.body;
    db.query('INSERT INTO fabricantes SET ?', {nombre}, (error, result) => {
        if (error) throw error;
        res.redirect('/listafabricante');
    });
});

// Mostrar formulario para editar un  fabricante
app.get('/editarfabricante/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM fabricantes WHERE fabricante_id = ?', id, (error, result) => {
        if (error) throw error;
        res.render('editarfabricante', {fabricantes: result[0] });
    });
});

// Actualizar un usuario en la base de datos
app.post('/editarfabricante/:id', (req, res) => {
    const id = req.params.id;
    const {nombre} = req.body;
    db.query('UPDATE fabricantes SET nombre= ? WHERE fabricante_id = ?', [nombre,id], (error, result) => {
        if (error) throw error;
        res.redirect('/listafabricante');
    });
});

// Eliminar un usuario de la base de datos
app.get('/eliminarfabricante/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM fabricantes WHERE fabricante_id = ?', id, (error, result) => {
        if (error) throw error;
        res.redirect('/listafabricante');
    });
});

// Obtener todas las categorias
app.get('/listacategorias', (req, res) => {
    db.query('SELECT * FROM categorias', (error, results) => {
        if (error) throw error;
        res.render('indexcategorias', { categorias: results });
    });
});

app.get('/', (req, res) => {
        res.render('home', (''));
    });


// Mostrar formulario para agregar una categoria
app.get('/agregarcategoria', (req, res) => {
    res.render('agregarcategorias');
});

// Agregar una categoria a la base de datos
app.post('/agregarcategoria', (req, res) => {
    const {categorias_id,nombre} = req.body;
    db.query('INSERT INTO categorias SET ?', {categorias_id,nombre}, (error, result) => {
        if (error) throw error;
        res.redirect('/listacategorias');
    });
});

// Mostrar formulario para editar una categoria
app.get('/editarcategoria/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM categorias WHERE categorias_id = ?', id, (error, result) => {
        if (error) throw error;
        res.render('editarcategoria', { categorias: result[0] });
    });
});

// Actualizar un usuario en la base de datos
app.post('/editarcategoria/:id', (req, res) => {
    const id = req.params.id;
    const { nombre} = req.body;
    db.query('UPDATE categorias SET nombre = ? WHERE categorias_id = ?', [nombre,id], (error, result) => {
        if (error) throw error;
        res.redirect('/listacategorias');
    });
});

// Eliminar un usuario de la base de datos
app.get('/eliminarcategoria/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM categorias WHERE categorias_id = ?', id, (error, result) => {
        if (error) throw error;
        res.redirect('/listacategorias');
    });
});


app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
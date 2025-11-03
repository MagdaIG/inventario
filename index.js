import { Producto } from './Producto.js';
import sequelize from './database/config.js';
import ProductoModel from './database/models/Producto.js';
import * as productoService from './services/productoService.js';

async function main() {
  console.log('=== Sistema de Gestión de Inventarios ===\n');

  // Parte 1: Demostración de clases Producto
  console.log('--- PARTE 1: Clases Producto ---\n');

  // Instanciar productos usando declaración de clase
  const producto1 = new Producto(
    'Laptop Dell',
    'Laptop Dell Inspiron 15 con procesador Intel i7',
    1299.99,
    5
  );

  const producto2 = new Producto(
    'Mouse Logitech',
    'Mouse inalámbrico Logitech MX Master 3',
    89.99,
    15
  );

  const producto3 = new Producto(
    'Teclado Mecánico',
    'Teclado mecánico RGB con switches Cherry MX',
    149.99,
    8
  );

  // Mostrar información de los productos
  producto1.mostrarInfo();
  producto2.mostrarInfo();
  producto3.mostrarInfo();

  // Demostración de getters y setters
  console.log('--- Demostración de Getters y Setters ---');
  console.log(`Nombre del producto 1: ${producto1.nombre}`);
  console.log(`Precio del producto 2: $${producto2.precio}`);
  
  producto1.precio = 1199.99;
  console.log(`Precio actualizado del producto 1: $${producto1.precio}\n`);

  // Parte 2: Operaciones CRUD con Sequelize
  console.log('--- PARTE 2: Operaciones CRUD con Sequelize ---\n');

  try {
    // Conectar a la base de datos y sincronizar modelos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.\n');
    
    await sequelize.sync({ force: false }); // force: true borra las tablas existentes
    console.log('Modelos sincronizados con la base de datos.\n');

    // CREAR productos
    console.log('--- CREAR Productos ---');
    const productoDB1 = await productoService.crearProducto(
      'Laptop Dell',
      'Laptop Dell Inspiron 15 con procesador Intel i7',
      1299.99,
      5
    );

    const productoDB2 = await productoService.crearProducto(
      'Mouse Logitech',
      'Mouse inalámbrico Logitech MX Master 3',
      89.99,
      15
    );

    const productoDB3 = await productoService.crearProducto(
      'Teclado Mecánico',
      'Teclado mecánico RGB con switches Cherry MX',
      149.99,
      8
    );

    console.log('\n--- LEER Todos los Productos ---');
    const todosLosProductos = await productoService.obtenerTodosLosProductos();
    todosLosProductos.forEach(p => {
      console.log(`ID: ${p.id}, Nombre: ${p.nombre}, Precio: $${p.precio}, Cantidad: ${p.cantidad}`);
    });

    console.log('\n--- LEER Producto por ID ---');
    const productoEncontrado = await productoService.obtenerProductoPorId(productoDB1.id);

    console.log('\n--- ACTUALIZAR Producto ---');
    await productoService.actualizarProducto(productoDB2.id, {
      precio: 79.99,
      cantidad: 20
    });

    console.log('\n--- LEER Producto Actualizado ---');
    const productoActualizado = await productoService.obtenerProductoPorId(productoDB2.id);

    console.log('\n--- ELIMINAR Producto ---');
    await productoService.eliminarProducto(productoDB3.id);

    console.log('\n--- Verificar Productos Restantes ---');
    const productosRestantes = await productoService.obtenerTodosLosProductos();
    console.log(`Total de productos: ${productosRestantes.length}`);

  } catch (error) {
    console.error('Error en operaciones CRUD:', error.message);
  } finally {
    // Cerrar conexión
    await sequelize.close();
    console.log('\nConexión a la base de datos cerrada.');
  }
}

// Ejecutar el programa principal
main().catch(console.error);


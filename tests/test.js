import { Producto } from '../Producto.js';
import sequelize from '../database/config.js';
import ProductoModel from '../database/models/Producto.js';
import * as productoService from '../services/productoService.js';

async function ejecutarPruebas() {
  console.log('=== Ejecutando Pruebas ===\n');

  let testsPasados = 0;
  let testsFallidos = 0;

  // Prueba 1: Crear instancia de Producto
  console.log('Prueba 1: Crear instancia de Producto');
  try {
    const p = new Producto('Test', 'Descripción', 100, 10);
    if (p.nombre === 'Test' && p.precio === 100) {
      console.log('✓ Pasó: Instancia creada correctamente\n');
      testsPasados++;
    } else {
      throw new Error('Valores incorrectos');
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 2: Getters funcionan correctamente
  console.log('Prueba 2: Getters');
  try {
    const p = new Producto('Producto', 'Desc', 50, 5);
    if (p.nombre === 'Producto' && p.precio === 50 && p.cantidad === 5) {
      console.log('✓ Pasó: Getters funcionan correctamente\n');
      testsPasados++;
    } else {
      throw new Error('Getters no retornan valores correctos');
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 3: Setters con validación
  console.log('Prueba 3: Setters con validación');
  try {
    const p = new Producto('Producto', 'Desc', 50, 5);
    p.precio = 75;
    p.cantidad = 10;
    if (p.precio === 75 && p.cantidad === 10) {
      console.log('✓ Pasó: Setters funcionan correctamente\n');
      testsPasados++;
    } else {
      throw new Error('Setters no actualizan valores');
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 4: Validación de setters con valores inválidos
  console.log('Prueba 4: Validación de setters');
  try {
    const p = new Producto('Producto', 'Desc', 50, 5);
    try {
      p.precio = -10;
      throw new Error('Debió lanzar error');
    } catch (error) {
      if (error.message.includes('precio')) {
        console.log('✓ Pasó: Validación de precio funciona\n');
        testsPasados++;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 5: Conexión a base de datos
  console.log('Prueba 5: Conexión a base de datos');
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('✓ Pasó: Conexión establecida\n');
    testsPasados++;
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 6: CREAR producto en BD
  console.log('Prueba 6: CREAR producto');
  try {
    const producto = await productoService.crearProducto(
      'Producto Test',
      'Descripción test',
      99.99,
      10
    );
    if (producto && producto.id) {
      console.log('✓ Pasó: Producto creado en BD\n');
      testsPasados++;
    } else {
      throw new Error('Producto no tiene ID');
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 7: LEER todos los productos
  console.log('Prueba 7: LEER todos los productos');
  try {
    const productos = await productoService.obtenerTodosLosProductos();
    if (Array.isArray(productos) && productos.length > 0) {
      console.log('✓ Pasó: Se obtuvieron productos\n');
      testsPasados++;
    } else {
      throw new Error('No se obtuvieron productos');
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 8: LEER producto por ID
  console.log('Prueba 8: LEER producto por ID');
  try {
    const producto = await productoService.crearProducto(
      'Producto Find',
      'Para buscar',
      50,
      5
    );
    const encontrado = await productoService.obtenerProductoPorId(producto.id);
    if (encontrado && encontrado.id === producto.id) {
      console.log('✓ Pasó: Producto encontrado por ID\n');
      testsPasados++;
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 9: ACTUALIZAR producto
  console.log('Prueba 9: ACTUALIZAR producto');
  try {
    const producto = await productoService.crearProducto(
      'Producto Update',
      'Para actualizar',
      100,
      10
    );
    await productoService.actualizarProducto(producto.id, {
      precio: 150,
      cantidad: 20
    });
    const actualizado = await productoService.obtenerProductoPorId(producto.id);
    if (actualizado.precio == 150 && actualizado.cantidad == 20) {
      console.log('✓ Pasó: Producto actualizado correctamente\n');
      testsPasados++;
    } else {
      throw new Error('Valores no actualizados');
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 10: ELIMINAR producto
  console.log('Prueba 10: ELIMINAR producto');
  try {
    const producto = await productoService.crearProducto(
      'Producto Delete',
      'Para eliminar',
      25,
      3
    );
    await productoService.eliminarProducto(producto.id);
    try {
      await productoService.obtenerProductoPorId(producto.id);
      throw new Error('Producto aún existe');
    } catch (error) {
      if (error.message.includes('no encontrado')) {
        console.log('✓ Pasó: Producto eliminado correctamente\n');
        testsPasados++;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(`✗ Falló: ${error.message}\n`);
    testsFallidos++;
  }

  // Prueba 11: Manejo de errores - producto no encontrado al actualizar
  console.log('Prueba 11: Manejo de errores - actualizar producto inexistente');
  try {
    await productoService.actualizarProducto(99999, { precio: 100 });
    throw new Error('Debió lanzar error');
  } catch (error) {
    if (error.message.includes('no encontrado')) {
      console.log('✓ Pasó: Error manejado correctamente\n');
      testsPasados++;
    } else {
      console.log(`✗ Falló: ${error.message}\n`);
      testsFallidos++;
    }
  }

  // Prueba 12: Manejo de errores - eliminar producto inexistente
  console.log('Prueba 12: Manejo de errores - eliminar producto inexistente');
  try {
    await productoService.eliminarProducto(99999);
    throw new Error('Debió lanzar error');
  } catch (error) {
    if (error.message.includes('no encontrado')) {
      console.log('✓ Pasó: Error manejado correctamente\n');
      testsPasados++;
    } else {
      console.log(`✗ Falló: ${error.message}\n`);
      testsFallidos++;
    }
  }

  // Resumen
  console.log('\n=== Resumen de Pruebas ===');
  console.log(`Pruebas pasadas: ${testsPasados}`);
  console.log(`Pruebas fallidas: ${testsFallidos}`);
  console.log(`Total: ${testsPasados + testsFallidos}`);

  await sequelize.close();
  process.exit(testsFallidos > 0 ? 1 : 0);
}

ejecutarPruebas().catch(console.error);


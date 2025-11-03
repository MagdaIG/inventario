import Producto from '../database/models/Producto.js';

// Operaciones CRUD para Producto

// CREAR - Agregar un nuevo producto
export async function crearProducto(nombre, descripcion, precio, cantidad) {
  try {
    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      cantidad
    });
    console.log('Producto creado exitosamente:', producto.toJSON());
    return producto;
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    throw error;
  }
}

// LEER - Obtener todos los productos
export async function obtenerTodosLosProductos() {
  try {
    const productos = await Producto.findAll({
      order: [['id', 'ASC']]
    });
    console.log(`Total de productos encontrados: ${productos.length}`);
    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    throw error;
  }
}

// LEER - Obtener un producto por ID
export async function obtenerProductoPorId(id) {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    console.log('Producto encontrado:', producto.toJSON());
    return producto;
  } catch (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error.message);
    throw error;
  }
}

// ACTUALIZAR - Actualizar precio o cantidad de un producto
export async function actualizarProducto(id, datosActualizados) {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    // Validar que al menos un campo sea actualizado
    const camposPermitidos = ['nombre', 'descripcion', 'precio', 'cantidad'];
    const camposParaActualizar = {};
    
    for (const campo of camposPermitidos) {
      if (datosActualizados.hasOwnProperty(campo)) {
        camposParaActualizar[campo] = datosActualizados[campo];
      }
    }

    if (Object.keys(camposParaActualizar).length === 0) {
      throw new Error('No se proporcionaron campos válidos para actualizar');
    }

    await Producto.update(camposParaActualizar, {
      where: { id },
      returning: true
    });

    // Obtener el producto actualizado
    await producto.reload();
    console.log('Producto actualizado exitosamente:', producto.toJSON());
    return producto;
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error.message);
    throw error;
  }
}

// ELIMINAR - Eliminar un producto
export async function eliminarProducto(id) {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    await Producto.destroy({
      where: { id }
    });

    console.log(`Producto con ID ${id} eliminado exitosamente`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id}:`, error.message);
    throw error;
  }
}


// Declaración de clase Producto
export class Producto {
  constructor(nombre, descripcion, precio, cantidad) {
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._precio = precio;
    this._cantidad = cantidad;
  }

  // Accesadores (Getters)
  get nombre() {
    return this._nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  get precio() {
    return this._precio;
  }

  get cantidad() {
    return this._cantidad;
  }

  // Mutadores (Setters)
  set nombre(nuevoNombre) {
    if (nuevoNombre && nuevoNombre.trim().length > 0) {
      this._nombre = nuevoNombre;
    } else {
      throw new Error("El nombre no puede estar vacío");
    }
  }

  set descripcion(nuevaDescripcion) {
    this._descripcion = nuevaDescripcion;
  }

  set precio(nuevoPrecio) {
    if (typeof nuevoPrecio === 'number' && nuevoPrecio >= 0) {
      this._precio = nuevoPrecio;
    } else {
      throw new Error("El precio debe ser un número positivo");
    }
  }

  set cantidad(nuevaCantidad) {
    if (typeof nuevaCantidad === 'number' && nuevaCantidad >= 0) {
      this._cantidad = nuevaCantidad;
    } else {
      throw new Error("La cantidad debe ser un número positivo");
    }
  }

  // Método personalizado para mostrar información
  mostrarInfo() {
    console.log("=== Información del Producto ===");
    console.log(`Nombre: ${this._nombre}`);
    console.log(`Descripción: ${this._descripcion}`);
    console.log(`Precio: $${this._precio.toFixed(2)}`);
    console.log(`Cantidad: ${this._cantidad}`);
    console.log("================================\n");
  }
}

// Expresión de clase Producto
export const ProductoExpresion = class {
  constructor(nombre, descripcion, precio, cantidad) {
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._precio = precio;
    this._cantidad = cantidad;
  }

  // Accesadores (Getters)
  get nombre() {
    return this._nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  get precio() {
    return this._precio;
  }

  get cantidad() {
    return this._cantidad;
  }

  // Mutadores (Setters)
  set nombre(nuevoNombre) {
    if (nuevoNombre && nuevoNombre.trim().length > 0) {
      this._nombre = nuevoNombre;
    } else {
      throw new Error("El nombre no puede estar vacío");
    }
  }

  set descripcion(nuevaDescripcion) {
    this._descripcion = nuevaDescripcion;
  }

  set precio(nuevoPrecio) {
    if (typeof nuevoPrecio === 'number' && nuevoPrecio >= 0) {
      this._precio = nuevoPrecio;
    } else {
      throw new Error("El precio debe ser un número positivo");
    }
  }

  set cantidad(nuevaCantidad) {
    if (typeof nuevaCantidad === 'number' && nuevaCantidad >= 0) {
      this._cantidad = nuevaCantidad;
    } else {
      throw new Error("La cantidad debe ser un número positivo");
    }
  }

  // Método personalizado para mostrar información
  mostrarInfo() {
    console.log("=== Información del Producto ===");
    console.log(`Nombre: ${this._nombre}`);
    console.log(`Descripción: ${this._descripcion}`);
    console.log(`Precio: $${this._precio.toFixed(2)}`);
    console.log(`Cantidad: ${this._cantidad}`);
    console.log("================================\n");
  }
};


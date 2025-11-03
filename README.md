# Sistema de Gestión de Inventarios

Este proyecto es un sistema de gestión de inventarios desarrollado en JavaScript que implementa clases de productos y utiliza Sequelize como ORM para realizar operaciones CRUD en una base de datos SQLite.

## Información del Autor

**Nombre:** Magdalena Inalaf

**GitHub:** https://github.com/MagdaIG

**LinkedIn:** https://www.linkedin.com/in/minalaf/

**Página Web:** https://inalaf.ca/

**Email:** magda.inalaf@gmail.com

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clonar o descargar el repositorio
2. Abrir una terminal en el directorio del proyecto
3. Instalar las dependencias:

```bash
npm install
```

Esto instalará las siguientes dependencias:
- sequelize: ORM para trabajar con bases de datos
- sqlite3: Driver para base de datos SQLite

## Estructura del Proyecto

```
inventario/
├── Producto.js                    # Clase Producto (declaración y expresión)
├── database/
│   ├── config.js                 # Configuración de Sequelize
│   └── models/
│       └── Producto.js           # Modelo Producto con Sequelize
├── services/
│   └── productoService.js        # Servicios CRUD para productos
├── tests/
│   └── test.js                   # Archivo de pruebas
├── index.js                      # Archivo principal de ejecución
├── package.json                  # Configuración del proyecto
└── README.md                     # Este archivo
```

## Uso

### Ejecutar el Programa Principal

Para ejecutar el programa completo que demuestra las clases y las operaciones CRUD:

```bash
npm start
```

Este comando ejecutará `index.js` que:
1. Instancia productos utilizando la clase Producto
2. Muestra información de los productos usando el método `mostrarInfo()`
3. Demuestra el uso de getters y setters
4. Conecta a la base de datos
5. Realiza operaciones CRUD completas (crear, leer, actualizar, eliminar productos)

### Ejecutar Pruebas

Para ejecutar todas las pruebas del sistema:

```bash
npm test
```

Este comando ejecutará `tests/test.js` que verifica:
- Creación de instancias de Producto
- Funcionamiento de getters y setters
- Validaciones de setters
- Conexión a la base de datos
- Todas las operaciones CRUD
- Manejo de errores

## Configuración de la Base de Datos

El proyecto utiliza SQLite como base de datos. La base de datos se crea automáticamente en el archivo `inventario.db` en la raíz del proyecto la primera vez que se ejecuta el programa.

La configuración de la base de datos se encuentra en `database/config.js`. Para cambiar a otra base de datos (como MySQL o PostgreSQL), modificar este archivo con la configuración correspondiente.

## Clase Producto

El proyecto incluye dos formas de definir la clase Producto:

### Declaración de Clase

```javascript
export class Producto {
  constructor(nombre, descripcion, precio, cantidad) {
    // ...
  }
  // métodos y propiedades
}
```

### Expresión de Clase

```javascript
export const ProductoExpresion = class {
  constructor(nombre, descripcion, precio, cantidad) {
    // ...
  }
  // métodos y propiedades
};
```

### Características de la Clase

- **Constructor:** Recibe nombre, descripción, precio y cantidad
- **Getters:** Permiten acceder a los valores de los atributos
- **Setters:** Permiten modificar los atributos con validación
- **Método mostrarInfo():** Imprime en consola todos los detalles del producto

### Ejemplo de Uso

```javascript
import { Producto } from './Producto.js';

const producto = new Producto(
  'Laptop Dell',
  'Laptop Dell Inspiron 15',
  1299.99,
  5
);

// Usar getters
console.log(producto.nombre);  // Laptop Dell
console.log(producto.precio);  // 1299.99

// Usar setters
producto.precio = 1199.99;
producto.cantidad = 10;

// Mostrar información
producto.mostrarInfo();
```

## Operaciones CRUD con Sequelize

### Crear Producto

```javascript
import * as productoService from './services/productoService.js';

const producto = await productoService.crearProducto(
  'Laptop Dell',
  'Laptop Dell Inspiron 15',
  1299.99,
  5
);
```

### Leer Todos los Productos

```javascript
const productos = await productoService.obtenerTodosLosProductos();
```

### Leer Producto por ID

```javascript
const producto = await productoService.obtenerProductoPorId(1);
```

### Actualizar Producto

```javascript
await productoService.actualizarProducto(1, {
  precio: 1199.99,
  cantidad: 10
});
```

### Eliminar Producto

```javascript
await productoService.eliminarProducto(1);
```

## Manejo de Errores

El sistema incluye manejo de errores para todas las operaciones CRUD:

- Si se intenta obtener, actualizar o eliminar un producto que no existe, se lanza un error descriptivo
- Las validaciones de la clase Producto previenen valores inválidos (precios negativos, cantidades negativas, nombres vacíos)
- El modelo Sequelize incluye validaciones a nivel de base de datos

## Modelo Producto en Sequelize

### Atributos del Modelo

El modelo Producto está definido con los siguientes atributos:

- **id:** INTEGER (clave primaria, autoincremental)
- **nombre:** STRING (255 caracteres máximo, no puede ser nulo)
- **descripcion:** TEXT (puede ser nulo)
- **precio:** DECIMAL(10, 2) (debe ser un número decimal positivo)
- **cantidad:** INTEGER (debe ser un número entero positivo)

### Tipo de Datos Elegidos

- **nombre (STRING):** Tipo de dato de texto de longitud variable, apropiado para nombres que pueden variar en longitud pero tienen un límite razonable
- **descripcion (TEXT):** Tipo de dato de texto sin límite específico, ideal para descripciones que pueden ser extensas
- **precio (DECIMAL):** Tipo de dato decimal con 10 dígitos totales y 2 decimales, adecuado para precios monetarios que requieren precisión
- **cantidad (INTEGER):** Tipo de dato entero, apropiado para cantidades que siempre serán números enteros
- **id (INTEGER):** Clave primaria autoincremental, estándar para identificadores únicos

## Configuración de Sequelize

Sequelize fue configurado para trabajar con SQLite en el archivo `database/config.js`. La configuración incluye:

- Dialecto SQLite para usar base de datos local
- Ruta de almacenamiento del archivo de base de datos
- Desactivación de logging de consultas SQL (puede activarse cambiando `logging: false` a `logging: console.log`)

## Preguntas y Respuestas sobre ORM y Sequelize

### ¿Qué es un ORM?

ORM (Object-Relational Mapping o Mapeo Objeto-Relacional) es una técnica de programación que permite convertir datos entre sistemas incompatibles usando lenguajes orientados a objetos. En el contexto de bases de datos, un ORM permite trabajar con los datos de una base de datos relacional como si fueran objetos en el lenguaje de programación.

### ¿Por qué utilizar un ORM en lugar de escribir consultas SQL manualmente?

Utilizar un ORM ofrece varias ventajas:

- **Abstracción de la base de datos:** El código no depende directamente de SQL, lo que facilita cambiar de base de datos sin modificar todo el código
- **Seguridad:** Previene inyecciones SQL mediante parámetros preparados automáticamente
- **Productividad:** Reduce la cantidad de código necesario para realizar operaciones comunes
- **Mantenibilidad:** El código es más legible y fácil de mantener
- **Validación:** Permite definir validaciones a nivel de modelo que se aplican antes de guardar datos
- **Relaciones:** Facilita el manejo de relaciones entre tablas

### Ventajas de usar un ORM

- Código más limpio y orientado a objetos
- Menos código repetitivo para operaciones CRUD comunes
- Protección contra inyecciones SQL
- Facilita migraciones y cambios de esquema
- Manejo automático de conexiones a la base de datos
- Soporte para transacciones
- Validaciones integradas
- Facilita el manejo de relaciones entre modelos

### Desventajas de usar un ORM

- **Curva de aprendizaje:** Requiere aprender la sintaxis y conceptos del ORM específico
- **Rendimiento:** Puede ser más lento que SQL optimizado manualmente para consultas complejas
- **Complejidad oculta:** A veces el ORM genera consultas SQL complejas que podrían optimizarse manualmente
- **Abstracción:** Puede ocultar detalles importantes de la base de datos
- **Limitaciones:** Para consultas muy complejas o específicas, puede ser necesario escribir SQL directamente
- **Tamaño:** Los ORMs pueden agregar peso al proyecto

### ¿Qué es un modelo en el contexto de un ORM como Sequelize?

Un modelo en Sequelize es una representación de una tabla de base de datos. Define la estructura de los datos, los tipos de datos, las validaciones, y proporciona métodos para interactuar con la base de datos. Un modelo actúa como una capa de abstracción que permite trabajar con los datos como objetos JavaScript en lugar de escribir consultas SQL directamente.

En este proyecto, el modelo Producto está definido en `database/models/Producto.js` y representa la tabla `productos` en la base de datos. El modelo define los atributos (nombre, descripción, precio, cantidad), sus tipos de datos, validaciones, y Sequelize proporciona automáticamente métodos como `create()`, `findAll()`, `findByPk()`, `update()`, y `destroy()`.

### ¿Qué son las relaciones entre modelos y cómo se gestionan en Sequelize?

Las relaciones entre modelos representan las conexiones entre diferentes tablas en una base de datos relacional. Sequelize soporta varios tipos de relaciones:

- **hasOne (tiene uno):** Una relación uno-a-uno donde un modelo tiene exactamente una instancia de otro modelo
- **belongsTo (pertenece a):** Indica que un modelo pertenece a otro modelo (relación uno-a-muchos desde la perspectiva inversa)
- **hasMany (tiene muchos):** Una relación uno-a-muchos donde un modelo puede tener múltiples instancias de otro modelo
- **belongsToMany (pertenece a muchos):** Una relación muchos-a-muchos donde un modelo puede tener múltiples instancias de otro modelo y viceversa, típicamente a través de una tabla intermedia

Para definir relaciones en Sequelize, se utilizan métodos como `Model.hasOne()`, `Model.belongsTo()`, `Model.hasMany()`, y `Model.belongsToMany()`. Estas relaciones permiten realizar consultas que incluyen datos relacionados usando métodos como `include` en las consultas.

Por ejemplo, si tuviéramos un modelo Categoria relacionado con Producto, podríamos definir:

```javascript
Categoria.hasMany(Producto);
Producto.belongsTo(Categoria);
```

Y luego consultar productos con su categoría:

```javascript
const productos = await Producto.findAll({
  include: Categoria
});
```

## Documentación Técnica

### Proceso de Configuración de Sequelize

La configuración de Sequelize se realizó en varios pasos:

1. Instalación de dependencias mediante npm (sequelize y sqlite3)
2. Creación del archivo de configuración `database/config.js` que inicializa una instancia de Sequelize con el dialecto SQLite y especifica la ruta del archivo de base de datos
3. Creación del modelo Producto en `database/models/Producto.js` definiendo todos los atributos con sus tipos de datos y validaciones
4. Implementación de servicios en `services/productoService.js` que encapsulan las operaciones CRUD
5. Sincronización del modelo con la base de datos usando `sequelize.sync()` que crea las tablas necesarias si no existen

### Definición de los Modelos

El modelo Producto se definió usando el método `sequelize.define()` que recibe tres parámetros:
- Nombre del modelo
- Objeto con la definición de atributos (nombre, descripción, precio, cantidad)
- Objeto de opciones (nombre de tabla, timestamps)

Cada atributo incluye su tipo de dato de Sequelize y validaciones apropiadas. El atributo id se define como clave primaria con autoincremento.

### Realización de Operaciones CRUD

Las operaciones CRUD se implementaron en el archivo `services/productoService.js`:

- **Crear:** Se utiliza `Producto.create()` pasando un objeto con los datos del producto
- **Leer todos:** Se utiliza `Producto.findAll()` sin condiciones para obtener todos los registros
- **Leer por ID:** Se utiliza `Producto.findByPk(id)` para obtener un registro específico por su clave primaria
- **Actualizar:** Se utiliza `Producto.update()` con un objeto where para especificar qué registro actualizar y un objeto con los campos a modificar
- **Eliminar:** Se utiliza `Producto.destroy()` con un objeto where para especificar qué registro eliminar

Cada operación incluye manejo de errores con try-catch y validaciones para asegurar que el producto exista antes de actualizar o eliminar.

## Solución de Problemas

### Error de conexión a la base de datos

Si aparece un error de conexión, verificar que el directorio tenga permisos de escritura para crear el archivo `inventario.db`.

### Error al instalar dependencias

Si hay problemas al instalar las dependencias, intentar:
- Actualizar npm: `npm install -g npm@latest`
- Limpiar caché: `npm cache clean --force`
- Eliminar node_modules y package-lock.json y reinstalar

### La base de datos no se crea

La base de datos se crea automáticamente la primera vez que se ejecuta el programa. Si no se crea, verificar los permisos del directorio y los logs de error en la consola.

## Licencia

ISC


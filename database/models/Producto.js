import Sequelize from 'sequelize';
import sequelize from '../config.js';

// Definición del modelo Producto
const Producto = sequelize.define('Producto', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  precio: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0
    }
  }
}, {
  tableName: 'productos',
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

export default Producto;


// server.js - Backend con Express y MongoDB
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Modelo de Item
const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'El nombre del artículo es obligatorio'],
    trim: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: [1, 'La cantidad debe ser al menos 1'],
    default: 1
  },
  comprado: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('Item', itemSchema);

// ============ RUTAS (CRUD) ============

// GET - Obtener todos los items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los items',
      error: error.message
    });
  }
});

// GET - Obtener un item por ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el item',
      error: error.message
    });
  }
});

// POST - Crear nuevo item
app.post('/api/items', async (req, res) => {
  try {
    const { item, cantidad } = req.body;
    
    if (!item) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del artículo es obligatorio'
      });
    }
    
    const nuevoItem = await Item.create({
      item,
      cantidad: cantidad || 1,
      comprado: false
    });
    
    res.status(201).json({
      success: true,
      message: 'Item creado exitosamente',
      data: nuevoItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el item',
      error: error.message
    });
  }
});

// PUT - Actualizar item
app.put('/api/items/:id', async (req, res) => {
  try {
    const { item, cantidad, comprado } = req.body;
    
    const itemActualizado = await Item.findByIdAndUpdate(
      req.params.id,
      { item, cantidad, comprado },
      { new: true, runValidators: true }
    );
    
    if (!itemActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Item actualizado exitosamente',
      data: itemActualizado
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el item',
      error: error.message
    });
  }
});

// PATCH - Toggle comprado
app.patch('/api/items/:id/toggle', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }
    
    item.comprado = !item.comprado;
    await item.save();
    
    res.json({
      success: true,
      message: 'Estado actualizado',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el estado',
      error: error.message
    });
  }
});

// DELETE - Eliminar item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item no encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Item eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el item',
      error: error.message
    });
  }
});

// DELETE - Eliminar todos los items comprados
app.delete('/api/items/completed/all', async (req, res) => {
  try {
    const resultado = await Item.deleteMany({ comprado: true });
    
    res.json({
      success: true,
      message: `${resultado.deletedCount} items comprados eliminados`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar items comprados',
      error: error.message
    });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '🛒 API de Lista de Compras funcionando correctamente' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

import React, { useState, useEffect } from 'react';
import './ShoppingList.css';

function ShoppingList() {
  // Estados
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Cargar items del localStorage al montar el componente
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Guardar items en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  // Agregar item
  const handleAddItem = (e) => {
    e.preventDefault();
    
    if (!itemName.trim()) {
      alert('Por favor ingresa un nombre de artículo');
      return;
    }

    const newItem = {
      id: Date.now(), // ID único usando timestamp
      item: itemName.trim(),
      cantidad: parseInt(quantity) || 1,
      comprado: false
    };

    setItems([...items, newItem]);
    setItemName('');
    setQuantity(1);
  };

  // Eliminar item
  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Toggle comprado
  const handleToggleComprado = (id) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, comprado: !item.comprado }
        : item
    ));
  };

  // Actualizar cantidad
  const handleUpdateQuantity = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, cantidad: parseInt(newQuantity) || 1 }
        : item
    ));
  };

  // Limpiar lista completa
  const handleClearList = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los artículos?')) {
      setItems([]);
    }
  };

  // Eliminar items comprados
  const handleClearCompleted = () => {
    setItems(items.filter(item => !item.comprado));
  };

  return (
    <div className="shopping-list-container">
      <h1>🛒 Mi Lista de Compras</h1>

      {/* Formulario para agregar items */}
      <form className="add-item-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Nombre del artículo"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="item-input"
        />
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="quantity-input"
        />
        <button type="submit" className="add-button">
          Agregar
        </button>
      </form>

      {/* Estadísticas */}
      {items.length > 0 && (
        <div className="stats">
          <span>Total: {items.length} artículos</span>
          <span>Comprados: {items.filter(i => i.comprado).length}</span>
          <span>Pendientes: {items.filter(i => !i.comprado).length}</span>
        </div>
      )}

      {/* Lista de items */}
      <ul className="items-list">
        {items.length === 0 ? (
          <li className="empty-message">
            No hay artículos en la lista. ¡Agrega uno para comenzar!
          </li>
        ) : (
          items.map(item => (
            <li 
              key={item.id} 
              className={`item ${item.comprado ? 'comprado' : ''}`}
            >
              <input
                type="checkbox"
                checked={item.comprado}
                onChange={() => handleToggleComprado(item.id)}
                className="checkbox"
              />
              <span className="item-name">{item.item}</span>
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                className="quantity-badge"
                disabled={item.comprado}
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="delete-button"
                aria-label="Eliminar artículo"
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Botones de acción */}
      {items.length > 0 && (
        <div className="action-buttons">
          {items.some(i => i.comprado) && (
            <button onClick={handleClearCompleted} className="clear-completed-btn">
              Eliminar Comprados
            </button>
          )}
          <button onClick={handleClearList} className="clear-all-btn">
            Limpiar Todo
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingList;

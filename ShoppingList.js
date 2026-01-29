const shoppingList = [];

// Función para agregar item
function addItem(item, quantity) {
    if (!item || item.trim() === '') {
        alert('Por favor ingresa un nombre de artículo');
        return;
    }
    
    const newItem = {
        item: item,
        cantidad: parseInt(quantity) || 1,
        comprado: false
    };
    shoppingList.push(newItem);
    renderList();
    clearInputs();
}

// Función para eliminar item
function removeItem(index) {
    if (index >= 0 && index < shoppingList.length) {
        shoppingList.splice(index, 1);
        renderList();
    }
}

// Función para actualizar item
function updateItem(index, newItem, newQuantity) {
    if (index >= 0 && index < shoppingList.length) {
        shoppingList[index].item = newItem;
        shoppingList[index].cantidad = newQuantity;
        renderList();
    }
}

// Función para marcar/desmarcar como comprado
function toggleComprado(index) {
    if (index >= 0 && index < shoppingList.length) {
        shoppingList[index].comprado = !shoppingList[index].comprado;
        renderList();
    }
}

// Función para renderizar la lista en el DOM
function renderList() {
    const container = document.getElementById('shoppingListContainer');
    container.innerHTML = '';
    
    if (shoppingList.length === 0) {
        container.innerHTML = '<li class="empty">No hay artículos en la lista</li>';
        return;
    }
    
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = item.comprado ? 'comprado' : '';
        
        li.innerHTML = `
            <input type="checkbox" 
                   ${item.comprado ? 'checked' : ''} 
                   onchange="toggleComprado(${index})">
            <span class="item-name">${item.item}</span>
            <span class="item-quantity">x${item.cantidad}</span>
            <button class="delete-btn" onclick="removeItem(${index})">🗑️</button>
        `;
        
        container.appendChild(li);
    });
}

// Función para limpiar inputs
function clearInputs() {
    document.getElementById('itemInput').value = '';
    document.getElementById('quantityInput').value = '1';
    document.getElementById('itemInput').focus();
}

// Event Listeners cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const itemInput = document.getElementById('itemInput');
    const quantityInput = document.getElementById('quantityInput');
    
    // Agregar al hacer click en el botón
    addButton.addEventListener('click', () => {
        addItem(itemInput.value, quantityInput.value);
    });
    
    // Agregar al presionar Enter en el input de nombre
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem(itemInput.value, quantityInput.value);
        }
    });
    
    // Agregar al presionar Enter en el input de cantidad
    quantityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem(itemInput.value, quantityInput.value);
        }
    });
    
    // Renderizar lista inicial (vacía)
    renderList();
});

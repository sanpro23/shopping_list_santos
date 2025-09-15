

const shoppingList = [];  //funcion toma parametros (item, quantity)
function addItem(item, quantity) {  
    const newItem = {   // Estructura del objeto
        item: item,
        cantidad: quantity,
        comprado: false
    };
    shoppingList.push(newItem); //Añade objeto al array con push.()
}

function removeItem(index) {  //elimina un objeto Array segun index
    if (index >= 0 && index < shoppingList.length) { // verifica index dentro rango 
        shoppingList.splice(index, 1); // eliminar objeto en esa posicion
    } else {
        console.table("Indice fuera de rango.");
    }
}

function updateItem(index, newItem, newQuantity) { //modifica la  cantidad de un elemento
if (index >= 0 && index < shoppingList.length) { //si index correcto actualiza item y cantidad
    shoppingList[index].item = newItem; 
    shoppingList[index].cantidad = newQuantity;
} else {
    console.table("Indice fuera de rango");
}
}

function showList () {
    console.table(shoppingList);
}


addItem("comida Yaky", 1);
addItem("comida lucifer", 1);
addItem("toallitas", 3);
addItem("agua", 2);
showList();

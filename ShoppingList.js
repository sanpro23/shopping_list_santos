let shoppingList = [
{
    item: "",
    cantidad: 0,
    comprado: false
}
];

let shoppingList = [];
function addItem(item, quantity) {
    let newItem = {
        item: item,
        cantidad: quantity,
        comprado: false
    };
    shoppingList.push(newItem);
}

function removeItem(index) {
    if (index >= 0 && index < shoppingList.length) {
        shoppingList.splice(index, 1);
    } else {
        console.table("Indice fuera de rango.");
    }
};

function updateItem(index, newItem, newQuantity) { //modifica la  cantidad de un elemento
if (index >= 0 && index < shoppingList.length) {
    shoppingList[index].item = newItem;
    shoppingList[index].cantidad = newQuantity;
} else {
    console.table("Indice fuera de rango");
}
}
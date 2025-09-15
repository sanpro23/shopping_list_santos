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

const q = (elemento)=> document.querySelector(elemento) // função anônima
const qS = (elemento)=> document.querySelectorAll(elemento) // função anônima

pizzaJson.map((item, index)=>{
    let pizzaItem = q('.models .pizza-item').cloneNode(true)

    // preenchimento das informações em pizzaItem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    q('.pizza-area').append(pizzaItem)
})
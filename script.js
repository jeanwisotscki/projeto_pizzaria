const q = (elemento)=> document.querySelector(elemento) // função anônima
const qS = (elemento)=> document.querySelectorAll(elemento) // função anônima

pizzaJson.map((item, index)=>{
    let pizzaItem = q('.models .pizza-item').cloneNode(true)

    // preenchimento das informações em pizzaItem

    q('.pizza-area').append(pizzaItem)
})
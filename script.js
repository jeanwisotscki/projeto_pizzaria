const q = (elemento)=> document.querySelector(elemento) // função anônima
const qS = (elemento)=> document.querySelectorAll(elemento) // função anônima

pizzaJson.map((item, index)=>{
    let pizzaItem = q('.models .pizza-item').cloneNode(true)

    // preenchimento da listagem dos itens
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    // tela de compra dos itens
    pizzaItem.querySelector('a').addEventListener('click', (evento)=>{
        evento.preventDefault()

        q('.pizzaWindowArea').style.opacity = 0
        q('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
            q('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    q('.pizza-area').append(pizzaItem)
})
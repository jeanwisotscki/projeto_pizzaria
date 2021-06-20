let modalQtd = 1

const q = (elemento)=> document.querySelector(elemento) // função anônima
const qS = (elemento)=> document.querySelectorAll(elemento) // função anônima

pizzaJson.map((item, index)=>{
    let pizzaItem = q('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    // preenchimento da listagem dos itens
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    // tela do modal
    pizzaItem.querySelector('a').addEventListener('click', (evento)=>{
        evento.preventDefault()
        let key = evento.target.closest('.pizza-item').getAttribute('data-key')
        modalQtd = 1

        // preenchimento do modal
        q('.pizzaBig img').src = pizzaJson[key].img
        q('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        q('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        q('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        q('.pizzaInfo--size.selected').classList.remove('selected')
        qS('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if (sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]    
        })

        q('.pizzaInfo--qt').innerHTML = modalQtd

        q('.pizzaWindowArea').style.opacity = 0
        q('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
            q('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    q('.pizza-area').append(pizzaItem)
})
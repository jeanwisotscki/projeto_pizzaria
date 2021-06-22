let cart = []
let modalQtd = 1
let modalKey = 0

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
        modalKey = key

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

        // efeito de suavização de entrada e saida do modal
        q('.pizzaWindowArea').style.opacity = 0
        q('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
            q('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    q('.pizza-area').append(pizzaItem)
})

// eventos do modal
function closeModal(){
    q('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=>{
        q('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

// botão de fechar modal
qS('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal)
})

// botões de adicionar e remover itens
q('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (modalQtd > 1){
        modalQtd--
        q('.pizzaInfo--qt').innerHTML = modalQtd
    }
})
q('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQtd++
    q('.pizzaInfo--qt').innerHTML = modalQtd
})

// seleção de tamanhos das pizzas
qS('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (elemento)=>{
        q('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

// botão de adicionar ao carrinho
q('.pizzaInfo--addButton').addEventListener('click', ()=>{
    // Qual o tamanho?
    let size = parseInt(q('.pizzaInfo--size.selected').getAttribute('data-key'))

    cart.push({
        id: pizzaJson[modalKey].id,
        size: size,
        qtd: modalQtd
    })

    closeModal()
})
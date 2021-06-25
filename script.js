let cart = []
let modalQtd = 1
let modalKey = 0

const q = (elemento) => document.querySelector(elemento) // função anônima
const qS = (elemento) => document.querySelectorAll(elemento) // função anônima

pizzaJson.map((item, index) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key', index)
    // preenchimento da listagem dos itens
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    // tela do modal
    pizzaItem.querySelector('a').addEventListener('click', (evento) => {
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
        qS('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })
        q('.pizzaInfo--qt').innerHTML = modalQtd

        // efeito de suavização de entrada e saida do modal
        q('.pizzaWindowArea').style.opacity = 0
        q('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            q('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })

    q('.pizza-area').append(pizzaItem)
})

// eventos do modal
function closeModal() {
    q('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
        q('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

// botão de fechar modal
qS('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal)
})

// botões de adicionar e remover itens
q('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--
        q('.pizzaInfo--qt').innerHTML = modalQtd
    }
})
q('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++
    q('.pizzaInfo--qt').innerHTML = modalQtd
})

// seleção de tamanhos das pizzas
qS('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (elemento) => {
        q('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

// botão de adicionar ao carrinho
q('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(q('.pizzaInfo--size.selected').getAttribute('data-key'))

    let identifier = pizzaJson[modalKey].id + '@' + size

    let key = cart.findIndex((item) => {
        return item.identifier == identifier
    })

    if (key > -1) {
        cart[key].qtd += modalQtd
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size: size,
            qtd: modalQtd
        })
    }

    updateCart()
    closeModal()
})

// abrir carrinho mobile
q('.menu-openner').addEventListener('click', ()=>{
    if (cart.length > 0){
        q('aside').style.left = '0'
    }
})

// fechar carrinho mobile
q('.menu-closer').addEventListener('click', ()=>{
    q('aside').style.left = '100vw'
})

// carrinho
function updateCart(){
    q('.menu-openner span').innerHTML = cart.length
    
    if (cart.length > 0){
        q('aside').classList.add('show')
        q('.cart').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id)
            subtotal += pizzaItem.price * cart[i].qtd
            let cartItem = q('.models .cart--item').cloneNode(true)

            let pizzaSizeName = null
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = '(Pequena)'
                    break
                case 1:
                    pizzaSizeName = '(Média)'
                    break
                case 2:
                    pizzaSizeName = '(Grande)'
                    break
            }

            let pizzaName = `${pizzaItem.name} ${pizzaSizeName}`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if (cart[i].qtd > 1){
                    cart[i].qtd--
                } else{
                    cart.splice(i, 1)
                }
                updateCart()
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qtd++
                updateCart()
            })

            q('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1
        total = subtotal - desconto

        q('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        q('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        q('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    } else {
        q('aside').classList.remove('show')
        q('aside').style.left = '100vw'
    }
}
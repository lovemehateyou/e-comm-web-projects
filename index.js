import {products} from './product-class.js'
import {cart, saving_cart} from './cart.js'
import { setname } from './result.js'
import {saving_id} from './view.js'

function load(){
    let productsHTML = ''
    products.forEach((item)=>{
        productsHTML += `
            <div class="product-container">
            <div class="product-img">
                <img src="${item.image}" alt="" class="product-image">
            </div>
            
            <div class="product-name">
                ${item.name}
            </div>

                <div class="product-price">
                    ${(item.priceCents / 100).toFixed(2)}
                </div>
    
                    <div class="product-quantity">
                        <select class = "js-quantity${item.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        </select>
                    </div>   

                <div>
                    <button class="add-to-cart" data-item-id ="${item.id}">
                    Add to cart
                    </button>

                     <button class="view-product" data-item-id ="${item.id}">
                        View Product
                    </button>
                    
                </div>
        </div>
        `
    })

document.querySelector('.products-grid').innerHTML = productsHTML

let bag = {
   id : 0,
   quantity: 0             
}

document.querySelectorAll('.add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
    alert("Product Added To The Cart")
    const itemId = button.dataset.itemId
    const amount = document.querySelector(`.js-quantity${itemId}`).value
    bag.id = itemId
    bag.quantity = amount
    cart.push(bag)
    saving_cart(cart)
    
    })
   
})

document.querySelectorAll('.view-product').forEach((button)=>{
    button.addEventListener("click",()=>{
        const itemId = button.dataset.itemId
        console.log(itemId)
        let ok = saving_id(itemId)
        if(ok ===1){
             window.location.href = "view.html"
        }
    })
})
}

load()


document.querySelector('.search-button').addEventListener('click',()=>{
   let thename =  document.querySelector('.search-bar').value
   console.log(thename)
    let ok = setname(thename)
    if(ok === 1){
        window.location.href = "result.html";
    }
})

const images_list = [
    '../images/person-working-from-home',

    '../images/father-and-child-spending-time-together-outdoors',

    '../images/person-shopping-online',

    '../images/person-browsing-products-in-a-store'
    
]

let count = 0

function backgroundImg(){
   
let member = document.querySelector(".mid-part")  
member.style.backgroundImage = `url(${images_list[count]}.png`
count = (count + 1) % images_list.length
}
setInterval(backgroundImg, 4000); 
import { products } from "./product-class.js"
import {cart, saving_cart} from './cart.js'

let result_name =  JSON.parse(localStorage.getItem('result_name')) || ''
localStorage.removeItem('result_name')

export function setname(name) {
    localStorage.setItem('result_name', JSON.stringify(name));
    return 1;
}



let resultHTML = ''
products.forEach((item)=>{
    let prod = item.name.toLowerCase()
    if(prod.includes(result_name.toLowerCase())){
        
        resultHTML +=`
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
                    
                    <button class="view-product" data-item-id = "${item.id}">
                    View
                    </button>
                </div>
        </div>
        
        `
    }
})

document.querySelector('.products-grid').innerHTML = resultHTML

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

import { products } from "../scripts/product-class.js"
import {cart, saving_cart} from '../scripts/cart.js'
import {prodid} from '../scripts/view.js'

let ViewHTML = ''
products.forEach((item)=>{
    if(item.id === prodid){
        ViewHTML += `
             <div class="product_content">

            <div class="image_contan">
                <img src="${item.image}">
            </div>
    
    
        <div class="prod_info">
                <h1>
                    ${item.name}
                </h1>
    
                <p>
                    ${item.description}
                </p>
    
                <h3>
                     ${(item.priceCents / 100).toFixed(2)}
                </h3>

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
                
                <button class="add-to-cart" data-item-id ="${item.id}">
                    Add to cart
                </button>
        </div>
        `
    }
})

document.addEventListener('DOMContentLoaded', () => {
    // Ensure this line correctly references the correct class
    const productHolder = document.querySelector('.product-holder');
    if (productHolder) {
        productHolder.innerHTML = ViewHTML;
    } else {
        console.error('The element with class .product-holder was not found.');
    }

    // Set up event listeners after rendering the content
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            alert("Product Added To The Cart");
            const itemId = button.dataset.itemId;
            const amount = document.querySelector(`.js-quantity${itemId}`).value;
            bag.id = itemId;
            bag.quantity = amount;
            cart.push(bag);
            saving_cart(cart);
        });
    });
});

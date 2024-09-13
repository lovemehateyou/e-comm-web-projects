import { products } from "./product-class.js";
import { cart, delete_from_cart,isMobileDevice } from "./cart.js";
import {setid,setamount} from "./buy_form.js"

function cart_load() {
    let cartHTML = '';

    products.forEach((item) => {
        cart.forEach((cart_item) => {
            // Ensure you're comparing the correct IDs
            if (item.id === cart_item.id) {
                cartHTML += `
                <div class="cart-product">
                    <div class="cart-image">
                        <img src="${item.image}" alt="Product Image" class="img">
                    </div>
                    <div class="cart-info"> 
                        <div class="cart-name">
                            Name: ${item.name}
                        </div>
                        <div class="cart-quantity">
                            Quantity: ${cart_item.quantity}
                        </div>
                        <div class="cart-price">
                            Price: ${(item.priceCents / 100 * cart_item.quantity).toFixed(2)}
                        </div>
                        <div class="cart-buttons">
                            <button class="cart-buy" 
                                data-item-id="${cart_item.id}" data-item-amount ="${cart_item.quantity}">
                                     Buy
                                </button>
                            <button class="cart-remove" 
                                data-item-id="${cart_item.id}">Remove</button>
                        </div>
                         <div class="message"></div>
                    </div>
                </div>`;
            }
        });
    });

    document.querySelector('.cartholders').innerHTML = cartHTML;

    // Add event listeners to the remove buttons
    document.querySelectorAll('.cart-remove').forEach((del_button) => {
        del_button.addEventListener('click', () => {
            const itemId = del_button.dataset.itemId;
            console.log(itemId)
            delete_from_cart(itemId);

            cart_load();
        });
    });

    let name = ''
    let price = 0
    let size = 0

    document.querySelectorAll('.cart-buy').forEach((buy_button)=>{
        buy_button.addEventListener('click', async () => {
            const itemId = buy_button.dataset.itemId;
            const Amount = buy_button.dataset.itemAmount;
            console.log(itemId, Amount,)
            const id = setid(itemId)
            const amount = setamount(Amount)
            if(id === 1 && amount ===1){
                window.location.href = "buy_form.html"
            } 

        })
    })
}


cart_load();



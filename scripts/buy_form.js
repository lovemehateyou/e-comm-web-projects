export const product_id = JSON.parse(localStorage.getItem("buy_id"))
export const Amount = JSON.parse(localStorage.getItem("buy_amount")) 

localStorage.removeItem('buy_id')
localStorage.removeItem('buy_amount')

export function setid(prodid){
    localStorage.setItem("buy_id",JSON.stringify(prodid))
    return 1   
}

export function setamount(prodamount){
    localStorage.setItem("buy_amount",JSON.stringify(prodamount))
    return 1
}



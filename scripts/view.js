
export let prodid = JSON.parse(localStorage.getItem("prod-ID")) || ''

localStorage.removeItem('result_name')

export function saving_id(ID){
    localStorage.setItem("prod-ID",JSON.stringify(ID))
    return 1
 }


import { saving_user } from "classes.js"

const first_part = {
    nameing: '',
    email: "",
    phone:0,
    address:'',
    password :'',
    username:''
   
}

document.querySelector('.next').addEventListener('click',()=>{
    first_part.nameing = document.querySelector('.name').value
    first_part.email = document.querySelector('.email').value
    first_part.phone = document.querySelector('.phone').value
    first_part.address = document.querySelector('.address').value
    first_part.username = document.querySelector('.username').value
    first_part.password = document.querySelector('.password').value

    saving_user(first_part)
    
})



function togglePassword() {
    const passwordField = document.querySelector('.password');
    const toggleBtn = document.querySelector('.toggle-btn');
    
    toggleBtn.addEventListener('click',()=>{
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleBtn.textContent = 'Hide';
        } else {
            passwordField.type = 'password';
            toggleBtn.textContent = 'Show';
        }
    })  
}

togglePassword() 
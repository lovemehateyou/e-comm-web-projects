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


document.querySelector('.js-log').addEventListener('click', async (event) => {
    

    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    const response = await fetch('https://e-comm-web-projects.vercel.app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password })
    });

    const data = await response.json();
    if (response.ok) {
        window.location.href = 'index.html'; 
        alert('Login successful!');
        

    } else {
        alert(`Error: ${data.error}`);
    }
});
import { product_id,Amount } from "./buy_form.js";



(function() {
    emailjs.init("o3ofobDK0vJsz_aUq"); 
})();


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        prod_id: `${product_id}`,
        prod_amount: `${Amount}`

    };


    emailjs.send('service_uvcrhxo', 'template_z6i1zb7', templateParams)
        .then(function(response) {
            alert('Message sent successfully!');
        }, function(error) {
            alert('Failed to send the message. Please try again later.');
            console.error('Error:', error);
        });
});


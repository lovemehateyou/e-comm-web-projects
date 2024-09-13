
(function () {
    emailjs.init("o3ofobDK0vJsz_aUq");
})();

const form = document.querySelector('.contact-form');

form.addEventListener('submit',(event)=>{
    event.preventDefault()

    const templateParams = {
        from_name: document.getElementById('name').value,
        email_id: document.getElementById('email').value,
        messege: document.getElementById('message').value,

    };

    // Send the email using EmailJS
    emailjs.send('service_kczl67r', 'template_tqx5abq', templateParams)
        .then(function (response) {
            alert('Message sent successfully!');
        }, function (error) {
            alert('Failed to send the message. Please try again later.');
            console.error('Error:', error);
        });
})
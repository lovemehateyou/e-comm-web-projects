
export async function saving_user(usering){
    try {
        // Send the data to the server
        const response = await fetch('https://e-comm-web-projects.vercel.app/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usering)
        });

        // Handle the response
        const result = await response.json();
        if (response.ok) {
            alert(result.message); // Show success message
        } else {
            alert(result.error); // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during sign-up.');
    }
}
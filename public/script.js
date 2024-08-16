function validateForm() {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;

    if (fullName === '' || email === '') {
        alert('Please fill in all fields.');
        return false;
    }

    // Submit the form data using fetch
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            full_name: fullName,
            email: email,
        }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit form');
    });

    return false; // Prevent form submission for demo purposes
}

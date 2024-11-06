const register = document.querySelector('.register');
const url = 'https://anime-server-rrxx.onrender.com/auth/signup';
const login_button = document.querySelector('.login-link');

async function newUserData(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Get input values dynamically when the form is submitted
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

        const userinfo = {
            username: username,
            email: email,
            password: password
        };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userinfo)
        });
        // Make sure the response is parsed as JSON
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          window.location.href = "index.html";
      } else {
          console.error('signup failed:', data.msg);
          alert(data.msg);
      }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving interaction data');
    }
}
// Add the event listener
register.addEventListener('click', newUserData);

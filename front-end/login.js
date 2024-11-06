const login = document.querySelector('.login-btn');
const url = 'https://anime-server-rrxx.onrender.com/auth/login';
const signup_button = document.querySelector('.signup-btn');

async function loginData(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Get input values dynamically when the form is submitted
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userinfo = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials : include,
            body: JSON.stringify(userinfo)
        });
        // Make sure the response is parsed as JSON
        data = await response.json();
        console.log(data);

        if (response.ok) {  
            console.log(data.msg, data.userId);
            user_id = data.userId;
            console.log(user_id);
            window.location.href ="index.html" ;
      } else {
          console.error('Login failed:', data.msg);
      }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving interaction data');
    }
}
login.addEventListener('click', loginData);
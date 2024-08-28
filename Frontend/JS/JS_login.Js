document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    alert("Login successful!");
    // Here you can add further login logic, like sending the data to a server
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
  // Show the Forgot Password modal when the link is clicked
  document.getElementById('forgot-password-link').addEventListener('click', function() {
    document.getElementById('forgot-password-modal').style.display = 'block';
});

// Handle showing an error message if login fails
const queryParams = new URLSearchParams(window.location.search);
if (queryParams.has('error')) {
    document.getElementById('error-message').textContent = 'Incorrect username or password.';
}

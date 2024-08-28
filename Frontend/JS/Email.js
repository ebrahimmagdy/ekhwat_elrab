document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("verificationForm");
    const otpInput = document.getElementById("otp");
    const errorMessage = document.getElementById("error-message");
    const resendOtpLink = document.getElementById("resend-otp-link");

    // Handle form submission with client-side validation
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const otpValue = otpInput.value.trim();

        // Basic OTP validation: check if it's numeric and of expected length
        if (otpValue === "" || isNaN(otpValue) || otpValue.length !== 6) {
            errorMessage.textContent = "Please enter a valid 6-digit Code.";
        } else {
            // Clear any existing error messages
            errorMessage.textContent = "";

            // Proceed with form submission (e.g., send OTP to the server for verification)
            form.submit();
        }
    });

    // Handle resend OTP functionality
    resendOtpLink.addEventListener("click", function(event) {
        event.preventDefault();

        // Example: Disable the resend link for 60 seconds after clicking to avoid spam
        resendOtpLink.textContent = "Resending OTP...";
        resendOtpLink.style.pointerEvents = "none";

        // Simulate an AJAX request to resend OTP
        setTimeout(function() {
            resendOtpLink.textContent = "Resend OTP";
            resendOtpLink.style.pointerEvents = "auto";
            alert("OTP has been resent to your email.");
        }, 2000);
    });
});

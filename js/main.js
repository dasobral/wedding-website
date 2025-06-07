// Countdown Timer for Wedding Date
document.addEventListener('DOMContentLoaded', function() {
    // Set the wedding date - June 12, 2026
    const weddingDate = new Date('April 11, 2026 00:00:00').getTime();
    
    // Update countdown every second
    const countdownTimer = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the wedding date
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown-timer').innerHTML = "<h3>Our Special Day Has Arrived!</h3>";
        }
    }, 1000);
    
    // Form validation for RSVP page
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(event) {
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const attendance = document.getElementById('attendance').value;
            
            if (!name || !email || !attendance) {
                event.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                event.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }
            
            // If everything is valid, form will submit
            // For now, we're preventing the default action and showing a success message
            // This is because we don't have a server to handle the form submission yet
            event.preventDefault();
            alert('Thank you for your RSVP! We look forward to celebrating with you.');
            rsvpForm.reset();
        });
    }
});
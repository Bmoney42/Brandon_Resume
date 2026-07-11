document.addEventListener('DOMContentLoaded', function() {
    fetch('https://lyzbihaio0.execute-api.us-east-1.amazonaws.com/default/resume_visitor_counter')
        .then(response => response.json())
        .then(data => {
            document.getElementById('count').textContent = data.count;
        })
        .catch(error => {
            document.getElementById('count').textContent = 'error';
            console.error('Counter error:', error);
        });
});
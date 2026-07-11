document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const completedSpan = document.getElementById('completed');
    const progressBarFill = document.querySelector('.progress-bar-fill');

    // Load saved state
    loadCheckboxState();

    // Add event listeners
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            saveCheckboxState();
            updateProgress();
        });
    });

    function saveCheckboxState() {
        const state = {};
        checkboxes.forEach((checkbox, index) => {
            state[`task${index}`] = checkbox.checked;
        });
        localStorage.setItem('challengeProgress', JSON.stringify(state));
    }

    function loadCheckboxState() {
        const saved = localStorage.getItem('challengeProgress');
        if (saved) {
            const state = JSON.parse(saved);
            checkboxes.forEach((checkbox, index) => {
                if (state[`task${index}`]) {
                    checkbox.checked = true;
                    checkbox.disabled = false; // Allow unchecking
                    checkbox.parentElement.classList.add('completed');
                }
            });
        }
    }

    function updateProgress() {
        let completed = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                completed++;
            }
        });

        const total = checkboxes.length;
        const percentage = Math.round((completed / total) * 100);

        completedSpan.textContent = completed;
        progressBarFill.style.width = percentage + '%';
        document.querySelector('.progress-percentage').textContent = percentage + '%';

        // Update checkbox parent styling
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkbox.parentElement.classList.add('completed');
            } else {
                checkbox.parentElement.classList.remove('completed');
            }
        });
    }

    // Initial update
    updateProgress();
});

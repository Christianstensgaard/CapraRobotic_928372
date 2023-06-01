const settingsImg = document.getElementById('settings');
const overlay = document.getElementById('overlay');
const closeSettings = document.getElementById('close');
const logbookDiv = document.getElementsByClassName('logbookDiv');
const settingsDiv = document.getElementById('settingsDiv');

settingsImg.addEventListener('click', function() {
    overlay.style.display = 'block';
    setTimeout(function() {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
    }, 50);
});

closeSettings.addEventListener('click', function() {
    overlay.style.opacity = '0';
    overlay.style.transform = 'translateY(-100%)';

    // Wait for the animation to finish before hiding the overlay
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 300); // Adjust the duration to match your CSS transition duration
});

settingsDiv.addEventListener('click', function() {
    window.location.href = 'settings.html';
});

for (let i = 0; i < logbookDiv.length; i++) {
    logbookDiv[i].addEventListener('click', function() {
        window.location.href = 'logbook.html';
    });
}


// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Live Clock (if element exists)
function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
        clockElement.textContent = timeStr;
    }
}
if (document.getElementById('live-clock')) {
    setInterval(updateClock, 1000);
    updateClock();
}

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const updateThemeIcon = (isLight) => {
        if (isLight) {
            icon.classList.replace('fa-moon', 'fa-sun');
            icon.classList.replace('text-purple-400', 'text-yellow-500');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            icon.classList.replace('text-yellow-500', 'text-purple-400');
        }
    };

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        updateThemeIcon(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Check Preference on Load
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        updateThemeIcon(true);
    }
}

// Lightbox / Modal Logic (for sertif.html)
function openModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = imgSrc;
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}

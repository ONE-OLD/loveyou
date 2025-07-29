// DOM elements
const openMessageBtn = document.getElementById('openMessageBtn');
const closeMessageBtn = document.getElementById('closeMessageBtn');
const passwordModal = document.getElementById('passwordModal');
const messageModal = document.getElementById('messageModal');
const passwordInput = document.getElementById('passwordInput');
const submitPassword = document.getElementById('submitPassword');
const cancelPassword = document.getElementById('cancelPassword');
const passwordError = document.getElementById('passwordError');
const heartsBackground = document.querySelector('.hearts-background');

// State
let isPasswordModalOpen = false;
let isModalOpen = false;

// Password configuration
const correctPassword = 'iloveyou';

// Heart SVG template
const heartSVG = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
`;

// Generate floating hearts
function generateFloatingHearts() {
    // Clear existing hearts
    heartsBackground.innerHTML = '';
    
    // Create 12 floating hearts
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = `floating-heart float-${(i % 3) + 1}`;
        heart.innerHTML = heartSVG;
        
        // Random positioning
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDelay = Math.random() * 3 + 's';
        
        heartsBackground.appendChild(heart);
    }
}

// Open password modal
function openPasswordModal() {
    if (isPasswordModalOpen) return;
    
    isPasswordModalOpen = true;
    passwordModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus on password input
    setTimeout(() => {
        passwordInput.focus();
    }, 100);
    
    // Clear previous input and error
    passwordInput.value = '';
    passwordError.classList.add('hidden');
}

// Close password modal
function closePasswordModal() {
    if (!isPasswordModalOpen) return;
    
    isPasswordModalOpen = false;
    passwordModal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Clear input and error
    passwordInput.value = '';
    passwordError.classList.add('hidden');
}

// Check password
function checkPassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === correctPassword) {
        // Correct password - close password modal and open message modal
        closePasswordModal();
        setTimeout(() => {
            openModal();
        }, 300);
    } else {
        // Incorrect password - show error
        passwordError.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add shake animation to input
        passwordInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

// Open modal
function openModal() {
    if (isModalOpen) return;
    
    isModalOpen = true;
    messageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Generate floating hearts
    generateFloatingHearts();
    
    // Add entrance animation
    messageModal.style.animation = 'fadeIn 0.3s ease-out';
}

// Close modal
function closeModal() {
    if (!isModalOpen) return;
    
    isModalOpen = false;
    
    // Add exit animation
    messageModal.style.animation = 'fadeOut 0.3s ease-out';
    
    setTimeout(() => {
        messageModal.classList.add('hidden');
        document.body.style.overflow = '';
        heartsBackground.innerHTML = '';
    }, 300);
}

// Event listeners
openMessageBtn.addEventListener('click', openPasswordModal);
closeMessageBtn.addEventListener('click', closeModal);
submitPassword.addEventListener('click', checkPassword);
cancelPassword.addEventListener('click', closePasswordModal);

// Handle Enter key in password input
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Close password modal when clicking outside
passwordModal.addEventListener('click', (e) => {
    if (e.target === passwordModal) {
        closePasswordModal();
    }
});

// Close modal when clicking outside
messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isPasswordModalOpen) {
        closePasswordModal();
    } else if (e.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

// Add fade out animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Heart Animation Website loaded successfully!');
});

document.querySelectorAll('ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Sesuaikan dengan tinggi header
                behavior: 'smooth'
            });
        }
    });
});

const messageForm = document.getElementById('messageForm');
const messageContainer = document.getElementById('messageContainer');

document.addEventListener('DOMContentLoaded', function () {
    loadMessages();
});

if (messageForm) {
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();
        const timestamp = new Date().toLocaleString();

        if (!name || !email || !message) {
            alert("Harap isi semua kolom.");
            return;
        }

        const newMessage = { name, email, message, timestamp };

        saveMessage(newMessage);
        addMessageToDisplay(newMessage);

        alert("Terima kasih atas pesanan Anda. Sudah terkirim!");
        this.reset();
    });
}

function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(message);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

    if (!messageContainer) return;

    if (messages.length === 0) {
        messageContainer.innerHTML = '<div class="no-message">No message yet. Be the first to send one!</div>';
        return;
    }

    messageContainer.innerHTML = '';
    messages.reverse().forEach(addMessageToDisplay);
}

function addMessageToDisplay(message) {
    if (!messageContainer) return;

    if (messageContainer.querySelector('.no-message')) {
        messageContainer.innerHTML = '';
    }

    const messageElement = document.createElement('div');
    messageElement.className = 'message-item';

    const secureEmail = message.email.replace(/(.{3})(.*)(@.*)/, '$1***$3');

    messageElement.innerHTML = `
        <div class="message-header">
            <div>
                <span>${message.name}</span>
                <span class="email-display">(${secureEmail})</span>
                <button class="show-email-btn" onclick="toggleFullEmail(this, '${message.email.replace(/'/g, "\\'")}')">Show Full Email</button>
            </div>
            <span>${message.timestamp}</span>
        </div>
        <div class="message-content">${message.message}</div>
    `;

    messageContainer.appendChild(messageElement);
}

function toggleFullEmail(button, fullEmail) {
    const emailDisplay = button.previousElementSibling;
    const isShowing = button.textContent === 'Show Full Email';

    emailDisplay.textContent = isShowing
        ? `(${fullEmail})`
        : `(${fullEmail.replace(/(.{3})(.*)(@.*)/, '$1***$3')})`;

    button.textContent = isShowing ? 'Hide Email' : 'Show Full Email';
}

// Banner smooth scroll
const banners = document.querySelectorAll('.banner');
banners.forEach(banner => {
    banner.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

const resetButton = document.getElementById('resetCommentsBtn');

if (resetButton) {
    resetButton.addEventListener('click', function () {
        if (confirm("Apakah kamu yakin ingin menghapus semua komentar?")) {
            localStorage.removeItem('contactMessages');
            loadMessages(); // Refresh tampilan setelah dihapus
            alert("Semua komentar telah dihapus.");
        }
    });
}

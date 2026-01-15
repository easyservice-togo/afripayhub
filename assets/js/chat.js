/**
 * AfriPayHub Chat Widget - WhatsApp Integrated
 * Dynamically injects and manages the chat widget with WhatsApp support
 */

(function () {
    const whatsAppNumber = "+228 93 89 92 54";
    const chatHTML = `
        <div class="chat-widget">
            <div class="chat-bubble" id="chatBubble">
                <i class="bi bi-chat-dots-fill"></i>
                <div class="notification-badge" id="chatBadge"></div>
            </div>
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <img src="assets/img/logo.png" alt="AfriPayHub">
                        <div class="chat-header-title">
                            <h5>AfriPayHub Support</h5>
                            <span>En ligne</span>
                        </div>
                    </div>
                    <div class="chat-close" id="chatClose">
                        <i class="bi bi-x-lg"></i>
                    </div>
                </div>
                <div class="chat-body" id="chatBody">
                    <div class="message received">
                        Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
                    </div>
                </div>
                <div class="chat-footer-container">
                    <div class="chat-whatsapp-suggestion" id="whatsappSuggestion">
                        <p>Préférez-vous WhatsApp ?</p>
                        <button class="btn-whatsapp-redirect" id="whatsappBtn">
                            <i class="bi bi-whatsapp"></i> Continuer sur WhatsApp
                        </button>
                    </div>
                    <div class="chat-footer">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Écrivez votre message...">
                        <button class="chat-send" id="chatSend">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // Elements
    const bubble = document.getElementById('chatBubble');
    const chatWin = document.getElementById('chatWindow');
    const close = document.getElementById('chatClose');
    const body = document.getElementById('chatBody');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    const badge = document.getElementById('chatBadge');
    const whatsappSuggestion = document.getElementById('whatsappSuggestion');
    const whatsappBtn = document.getElementById('whatsappBtn');

    // Toggle Chat
    bubble.addEventListener('click', () => {
        chatWin.classList.toggle('active');
        badge.style.display = 'none';
        if (chatWin.classList.contains('active')) {
            input.focus();
        }
    });

    close.addEventListener('click', (e) => {
        e.stopPropagation();
        chatWin.classList.remove('active');
    });

    // WhatsApp Redirection
    function redirectToWhatsApp(message = "") {
        // Clean the number: remove +, spaces, dots, etc.
        const cleanNumber = whatsAppNumber.replace(/\D/g, '');
        const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message || "Bonjour AfriPayHub, j'ai une question.")}`;
        window.open(url, '_blank');
    }

    whatsappBtn.addEventListener('click', () => {
        redirectToWhatsApp(input.value.trim());
    });

    // Send Message
    function sendMessage() {
        const text = input.value.trim();
        if (text) {
            // User message
            const userMsg = document.createElement('div');
            userMsg.className = 'message sent';
            userMsg.textContent = text;
            body.appendChild(userMsg);

            input.value = '';
            body.scrollTop = body.scrollHeight;

            // Show WhatsApp suggestion after first message
            whatsappSuggestion.classList.add('visible');

            // Simple auto-reply simulation
            setTimeout(() => {
                const reply = document.createElement('div');
                reply.className = 'message received';
                reply.textContent = "Merci ! Pour une réponse instantanée, vous pouvez aussi nous contacter sur WhatsApp.";
                body.appendChild(reply);
                body.scrollTop = body.scrollHeight;
            }, 1000);
        }
    }

    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Initial notification after 5 seconds
    setTimeout(() => {
        if (!chatWin.classList.contains('active')) {
            badge.style.display = 'block';
        }
    }, 5000);

})();

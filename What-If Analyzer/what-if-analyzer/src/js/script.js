let isProcessing = false;

function handleKeyPress(event) {
    if (event.key === 'Enter' && !isProcessing) {
        sendMessage();
    }
}

async function sendMessage() {
    if (isProcessing) return;

    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;

    isProcessing = true;
    addMessage(message, 'user');
    userInput.value = '';

    // Show loading animation
    addLoadingAnimation();

    try {
        const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/ai', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer oainVFKCrodSzeoNLNkNLsjOXz72',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{
                    role: 'user',
                    content: [{
                        type: 'text',
                        text: `Analyze this "What if" scenario and provide an insightful response: ${message}`
                    }]
                }]
            })
        });

        const result = await response.json();
        removeLoadingAnimation();
        addMessage(result.message, 'ai');
    } catch (error) {
        console.error('Error:', error);
        removeLoadingAnimation();
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    }

    isProcessing = false;
    scrollToBottom();
}

function addMessage(text, sender) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message message`;
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
}

function addLoadingAnimation() {
    const chatContainer = document.getElementById('chatContainer');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.id = 'loadingAnimation';
    chatContainer.appendChild(loadingDiv);
    scrollToBottom();
}

function removeLoadingAnimation() {
    const loadingAnimation = document.getElementById('loadingAnimation');
    if (loadingAnimation) {
        loadingAnimation.remove();
    }
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

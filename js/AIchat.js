// DOM 元素
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// API 配置
const API_URL = 'https://api.moonshot.cn/v1/chat/completions';
const API_KEY = 'sk-fIdV9NL9yFdBGfN2LAqRbOiGAdXgni02JG8T9fDj6jLu5N0g';

// 对话历史
let conversation = [
    {
        role: 'system',
        content: '你是一位资深戏曲研究员，专注于中国戏曲的研究与传承。你对京剧、昆曲、豫剧、越剧等多种戏曲形式有深入研究，能够回答关于戏曲历史、表演技巧、剧目内容、音乐伴奏等方面的问题。你的回答应体现专业性，同时尽量通俗易懂，帮助用户更好地理解和欣赏中国戏曲。'
    }
];

// 初始化聊天
function initChat() {
    addMessage({
        role: 'assistant',
        content: '您好！我是戏曲研究员AI，专注于中国戏曲的研究与传承。您有关于京剧、昆曲、豫剧或其他戏曲的问题都可以问我哦！',
        isUser: false
    });
}

// 添加消息到聊天窗口
function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.isUser ? 'user-message' : 'ai-message'}`;
    messageElement.textContent = message.content;

    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// 滚动到底部
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 发送消息
async function sendMessage() {
    const userInput = messageInput.value.trim();
    if (!userInput) return;

    // 添加用户消息
    addMessage({
        role: 'user',
        content: userInput,
        isUser: true
    });

    // 清空输入框
    messageInput.value = '';

    // 添加到对话历史
    conversation.push({
        role: 'user',
        content: userInput
    });

    // 显示加载状态
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading';
    chatMessages.appendChild(loadingIndicator);
    scrollToBottom();

    try {
        // 获取AI回复
        const aiResponse = await fetchAIResponse();
        // 移除加载状态
        chatMessages.removeChild(loadingIndicator);
        // 添加AI回复
        addMessage({
            role: 'assistant',
            content: aiResponse,
            isUser: false
        });
        // 添加到对话历史
        conversation.push({
            role: 'assistant',
            content: aiResponse
        });
    } catch (error) {
        chatMessages.removeChild(loadingIndicator);
        addMessage({
            role: 'system',
            content: '抱歉，获取回复时出错了，请稍后再试。',
            isUser: false
        });
        console.error('Error:', error);
    }
}

// 获取AI回复
async function fetchAIResponse() {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    };

    const data = {
        model: 'moonshot-v1-8k',
        messages: conversation,
        stream: false
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.choices[0].message.content;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// 事件监听
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 初始化
window.addEventListener('load', initChat);
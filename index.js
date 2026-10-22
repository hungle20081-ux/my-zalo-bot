const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Chỉ dùng dãy số token mà Zalo đã chấp nhận
const BOT_TOKEN = '984691381961150957';

app.post('/webhook', async (req, res) => {
    try {
        const data = req.body;
        
        const messageText = data?.message?.text || data?.text || data?.content;
        const senderName = data?.sender?.name || data?.from?.name || data?.sender_name || "Bạn";
        const chatId = data?.chat?.id || data?.to?.id || data?.chat_id || data?.thread_id;

        if (messageText && messageText.toLowerCase().trim() === 'hi') {
            const replyText = `hi @${senderName}`;
            
            await axios.post(`https://bot.zaloplatforms.com/api/v1/sendMessage`, {
                token: BOT_TOKEN,
                chat_id: chatId,
                text: replyText
            });
        }
    } catch (error) {
        console.error("Lỗi xử lý tin nhắn:", error.response?.data || error.message);
    }

    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot đang chạy trên cổng ${PORT}`);
});
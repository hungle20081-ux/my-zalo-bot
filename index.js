const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Token bot của bạn lấy từ Zalo
const BOT_TOKEN = '984691381961150957:LmQpsHvWLONIPRMELCIFmDDXIdmPJapXNMVWuSATiLZpvEYiogwutjZaOdHlccog';

// Endpoint để nhận sự kiện từ Zalo (Webhook)
app.post('/webhook', async (req, res) => {
    const data = req.body;
    
    // Kiểm tra xem có phải tin nhắn gửi đến không
    try {
        // Cấu trúc message tùy thuộc vào payload thực tế của Zalo Bot Platform
        const messageText = data?.message?.text || data?.text;
        const senderId = data?.sender?.id || data?.from?.id;
        const senderName = data?.sender?.name || data?.from?.name || "Bạn";
        const chatId = data?.chat?.id || data?.to?.id;

        if (messageText && messageText.toLowerCase().trim() === 'hi') {
            const replyText = `hi @${senderName}`;
            
            // Gửi tin nhắn phản hồi qua Zalo Bot API
            await axios.post(`https://bot.zaloplatforms.com/api/v1/sendMessage`, {
                token: BOT_TOKEN,
                chat_id: chatId,
                text: replyText
            });
        }
    } catch (error) {
        console.error("Lỗi xử lý tin nhắn:", error);
    }

    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot đang chạy trên cổng ${PORT}`);
});
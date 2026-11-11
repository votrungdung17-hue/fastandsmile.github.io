const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Cổng chạy server (mặc định là 3000 hoặc dùng cổng của dịch vụ cloud)
const PORT = process.env.PORT || 3000;

// Endpoint nhận dữ liệu từ Google Apps Script khi bấm nút MVA
app.post('/send-zalo-group', async (req, res) => {
    try {
        const { groupId, message } = req.body;

        if (!groupId || !message) {
            return res.status(400).json({ status: 'error', error: 'Thiếu groupId hoặc message!' });
        }

        console.log(`Đang gửi tin tới nhóm: ${groupId}`);
        console.log(`Nội dung:\n${message}`);

        // --- KHU VỰC GỌI HÀM GỬI TIN ZALO BOT ---
        // Tại đây bạn tích hợp hàm gửi tin của thư viện Zalo Bot cá nhân 
        // (Ví dụ: await zaloClient.sendMessage(groupId, message);)
        

        // Phản hồi về cho Google Apps Script
        res.status(200).json({ 
            status: 'success', 
            description: 'Đã bắn điện MVA vào nhóm Zalo thành công!' 
        });

    } catch (error) {
        console.error('Lỗi khi gửi:', error);
        res.status(500).json({ status: 'error', error: error.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Zalo Bot Server đang chạy tại cổng ${PORT}`);
});
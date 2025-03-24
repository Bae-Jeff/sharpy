const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static('public'));

// 모든 요청을 index.html로 리다이렉트
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 
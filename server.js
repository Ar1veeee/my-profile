const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios'); 
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


const SECRET_KEY = 'secret-key';  


app.post('/verify-recaptcha', async (req, res) => {
    const userResponse = req.body['g-recaptcha-response'];  
    console.log('Token received from frontend:', userResponse); 

    // Pastikan token ada
    if (!userResponse) {
        return res.status(400).send({ success: false, message: 'reCAPTCHA token missing' });
    }

    // Verifikasi reCAPTCHA
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${userResponse}`;

    try {
        const response = await axios.post(verificationUrl);
        console.log('Google reCAPTCHA Response:', response.data); // Log respons dari Google

        if (response.data.success) {
            // Jika verifikasi sukses
            res.send({ success: true, message: 'reCAPTCHA verified!' });
        } else {
            // Jika verifikasi gagal
            res.send({
                success: false,
                message: 'reCAPTCHA verification failed.',
                errorCodes: response.data['error-codes'], // Tambahkan error codes jika ada
            });
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error); // Log error
        res.status(500).send({ success: false, message: 'Error verifying reCAPTCHA' });
    }
});

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Setelah klien mengirimkan token reCAPTCHA untuk verifikasi
    ws.on('message', async (message) => {
        if (message.startsWith('verify-recaptcha:')) {
            // Mengambil token reCAPTCHA dari pesan
            const token = message.split(':')[1];
            console.log('Token received via WebSocket:', token); // Log token

            // Verifikasi token reCAPTCHA di server
            const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;
            try {
                const response = await axios.post(verificationUrl);
                console.log('WebSocket Google reCAPTCHA Response:', response.data); // Log respons dari Google

                if (response.data.success) {
                    ws.send('reCAPTCHA verified successfully!');
                } else {
                    ws.send(`reCAPTCHA verification failed: ${response.data['error-codes'] || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error verifying reCAPTCHA via WebSocket:', error); // Log error
                ws.send('Error verifying reCAPTCHA.');
            }
        } else {
            console.log(`Received: ${message}`);
            ws.send(`Echo: ${message}`);
        }
    });

    ws.on('close', () => console.log('Client disconnected'));
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
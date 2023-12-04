import axios from 'axios';
import React, { useState } from 'react'
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Button } from '@mui/material';


export default function QRCodeGenerate(props) {
    const urlWeb = '192.168.43.225:3000';

    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);

    const handleGenerateQrCode = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/QRCode/genrateQRCode/${urlWeb}/${props.idTable}/350/350`,
                {
                    responseType: 'arraybuffer',
                }
            );

            // Chuyển đổi dữ liệu ArrayBuffer sang chuỗi base64 sử dụng TypedArray
            const arrayBufferView = new Uint8Array(response.data);
            const blob = new Blob([arrayBufferView], { type: 'image/png' });
            const base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(blob);
            });

            const dataUrl = base64Data;
            setQrCodeDataUrl(dataUrl);
            handleDownloadQrCode();
        } catch (error) {
            console.error('Error generating QR Code:', error);
        }
    };
    const handleDownloadQrCode = () => {
        const a = document.createElement('a');
        a.href = qrCodeDataUrl;
        a.download = 'qr-code.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Button variant="contained" color="secondary" size="smail" onClick={handleGenerateQrCode} startIcon={<QrCodeIcon />}>
            QR Code
        </Button>
    )
};

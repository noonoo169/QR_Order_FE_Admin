import React from 'react';
import { Box, Button } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QRCode from 'qrcode.react';

const QRCodeGenerate = (props) => {
    const urlWeb = `https://qr-order-client.netlify.app/home/${props.idTable}`

    const downloadQR = () => {
        const canvas = document.getElementById('qrcode');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        console.log('pngUrl', pngUrl);
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `idTable:${props.idTable}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Box>
            <Box>
                <QRCode
                    id='qrcode'
                    value={urlWeb}
                    size={128}
                    level={'H'}
                    includeMargin={true}
                />
            </Box>
            <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={downloadQR}
                startIcon={<QrCodeIcon />}
            >
                Download QR Code
            </Button>

        </Box>
    );
};

export default QRCodeGenerate;

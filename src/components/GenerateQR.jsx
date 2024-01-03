import React from 'react';
import { Box, Button } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QRCode from 'qrcode.react';

const QRCodeGenerate = (props) => {
    const urlWeb = `https://qr-order-client.netlify.app/home/${props.table.id}`

    const downloadQR = () => {
        const qrImage = document.getElementById('qrcode');
        const canvas = document.createElement('canvas');
        canvas.width = qrImage.width;
        canvas.height = qrImage.height;
        const ctx = canvas.getContext('2d');

        // Draw the QR code image onto the canvas
        ctx.drawImage(qrImage, 0, 0);

        // Overlay text on the QR code image
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(`Table: ${props.table.name}`, canvas.width / 2, canvas.height - 10);

        // Trigger download of the canvas as an image
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `Table_QR_${props.table.name}.png`;
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
                    size={256}
                    level={'L'}
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
                Download QR Code For Table {props.table.name}
            </Button>

        </Box>
    );
};

export default QRCodeGenerate;

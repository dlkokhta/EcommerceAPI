export const purchaseConfirmationHtml = (link: any) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Tailwind CSS classes need to be inlined */
        .container { width: 100%; max-width: 600px; margin: auto; padding: 20px; background: #F6F9FC; border-radius: 8px; text-align: center; }
        .header { color: #fde047; text-transform: uppercase; font-size: 24px; margin-bottom: 20px; }
        .greeting { margin: 20px 0; font-size: 18px; color: #0d0d0d; }
        .message { margin: 20px 0; font-size: 16px; color: #0d0d0d; }
        .button { display: inline-block; padding: 10px 20px; margin-top: 20px; background: #fde047 ; color: #444444; text-decoration: none; font-weight: bold; border-radius: 5px; }
        .button:hover { background: #facc15 ; }
        .footer { margin-top: 40px; font-size: 14px; color: #0d0d0d; }
    </style>
</head>
<body class="bg-gray-500 text-white">
    <div class="container">
        <div class="header">Purchase Confirmation</div>
        <div class="message">Thank you for purchasing shoes from our store. Your order is being processed and will be shipped soon.</div>
        <a href="${link}" class="button">View Your Order</a>
        <div class="footer">If you did not make this purchase, please contact our support immediately.</div>
    </div>
</body>
</body>
</html>`;

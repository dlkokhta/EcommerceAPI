export const verifyHtml = (name: string, link: string) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Tailwind CSS classes need to be inlined */
        .container { width: 100%; max-width: 600px; margin: auto; padding: 20px; background: #1c1c1c; border-radius: 8px; text-align: center; }
        .header { color: #ffcc00; text-transform: uppercase; font-size: 24px; margin-bottom: 20px; }
        .greeting { margin: 20px 0; font-size: 18px; color: #ffffff; }
        .message { margin: 20px 0; font-size: 16px; color: #ffffff; }
        .button { display: inline-block; padding: 10px 20px; margin-top: 20px; background: #ffcc00; color: #000; text-decoration: none; font-weight: bold; border-radius: 5px; }
        .button:hover { background: #e0b800; }
        .footer { margin-top: 40px; font-size: 14px; color: #aaaaaa; }
    </style>
</head>
<body class="bg-gray-500 text-white">
    <div class="container">
        <div class="header">Verification Email</div>
        <div class="greeting">Hello ${name}!</div>
        <div class="message">Thank you for signing up. Please verify your email address by clicking the button below:</div>
        <a href="${link}" class="button">Verify Email</a>
        <div class="footer">If you did not request this verification, please ignore this email.</div>
    </div>
</body>
</html>`;

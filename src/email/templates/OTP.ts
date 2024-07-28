export const OTPHtml = (email: string, otp: string) => `
<html lang="en">
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-100 font-sans">
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
      <div class="text-center border-b pb-4">
        <h1 class="text-2xl font-bold text-yellow-400 uppercase">Ecommerce App</h1>
      </div>
      <div class="py-6">
        <p class="text-lg text-gray-700 mb-4">Hello ${email}!</p>
        <p class="text-gray-700 mb-4">Thank you for contacting us. </p>
        <p class="text-xl font-bold text-center text-yellow-400 mb-6">Your OTP is: ${otp}</p>
        <p class="text-gray-700">Please use this OTP to verify your account or to recover your password. The OTP is valid for a limited time, so be sure to use it promptly.</p>
      </div>
      <div class="text-center border-t pt-4 mt-6 text-gray-500 text-sm">
        <p>&copy; ${new Date().getFullYear()} DLK. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

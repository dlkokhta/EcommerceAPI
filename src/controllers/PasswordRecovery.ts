// import { Request, Response } from "express";

// const PasswordRecovery = async () => {

//         try {
//           const { email } = req.body;

//           // Check if the email exists in the database
//           const client = await pool.connect();
//           const result = await client.query({
//             text: "SELECT * FROM users WHERE email = $1",
//             values: [email],
//           });

//           if (result.rows.length === 0) {
//             return res.status(400).send({ error: "Email not found" });
//           }

//           // Generate a password reset token
//           const randomString = CryptoJS.lib.WordArray.random(32).toString(
//             CryptoJS.enc.Hex
//           );

//           await client.query({
//             text: `INSERT INTO passrecovery ( email,crypto_key ) VALUES ($1, $2)`,
//             values: [email, randomString],
//           });

//           await recoveryHeader(
//             email,

//             `http://localhost:3000/verify?param=${randomString}`
//           );

//           res.send({ message: "Password recovery email sent" });
//         } catch (error) {
//           next(error);
//         }
//       });

//       app.put("/api/reset-password", async (req, res, next) => {
//         try {
//           const { param, password } = req.body;
//           console.log(param);

//           const client = await pool.connect();

//           // Check if the key exists in the passrecovery table
//           const result = await client.query({
//             text: "SELECT * FROM passrecovery WHERE crypto_key = $1",
//             values: [param],
//           });

//           if (result.rows.length > 0) {
//             // If the key exists, update the user's password
//             const email = result.rows[0].email;
//             const saltRounds = 10;
//             const hashedPassword = await bcrypt.hash(password, saltRounds);
//             await client.query({
//               text: "UPDATE users SET password = $1 WHERE email = $2",
//               values: [hashedPassword, email],
//             });

//             // Delete the key from the passrecovery table
//             await client.query({
//               text: "DELETE FROM passrecovery WHERE email = $1",
//               values: [email],
//             });

//             res.send({ message: "Password updated successfully" });
//           } else {
//             // If the key does not exist, send an error message
//             res.status(400).send({ error: "Invalid password reset key" });
//           }
//         } catch (error) {
//           // Handle the error
//           console.error(error);
//           res.status(500).send({ error: "Internal server error" });
//         }
//       });

// export default PasswordRecovery;

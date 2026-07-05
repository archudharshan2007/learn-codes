import 'dotenv/config';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Generate a 6-digit OTP
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via Gmail
export async function sendEmailOTP(email, otp) {
  if (process.env.OTP_MODE === 'mock' || !process.env.GMAIL_USER) {
    console.log('\n==============================');
    console.log(`📧 [MOCK EMAIL OTP] Contact: ${email}`);
    console.log(`🔑 OTP Code: ${otp}`);
    console.log('==============================\n');
    return { success: true, mock: true };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"CodeEasy Academy" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: '🔑 Your CodeEasy Verification Code',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#27262E;padding:40px;border-radius:16px;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:32px;font-weight:900;color:#E19C63;letter-spacing:2px;">CodeEasy</span>
        </div>
        <h2 style="color:#ffffff;font-size:20px;margin-bottom:12px;">Your Verification Code</h2>
        <p style="color:#8BA5BE;margin-bottom:24px;">Enter this code to access your coding dashboard:</p>
        <div style="background:#1a191f;border:2px solid #E19C63;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
          <span style="font-size:42px;font-weight:900;color:#E19C63;letter-spacing:12px;">${otp}</span>
        </div>
        <p style="color:#8BA5BE;font-size:13px;">This code expires in 5 minutes. Do not share it with anyone.</p>
      </div>
    `,
  });

  return { success: true };
}

// Send OTP via Twilio SMS
export async function sendSmsOTP(phone, otp) {
  if (process.env.OTP_MODE === 'mock' || !process.env.TWILIO_ACCOUNT_SID) {
    console.log('\n==============================');
    console.log(`📱 [MOCK SMS OTP] Contact: ${phone}`);
    console.log(`🔑 OTP Code: ${otp}`);
    console.log('==============================\n');
    return { success: true, mock: true };
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: `Your CodeEasy verification code is: ${otp}. Valid for 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });

  return { success: true };
}

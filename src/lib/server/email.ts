import nodemailer from 'nodemailer';
import { ContactFormData } from '@/types/api';

export interface EmailConfig {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const generateContactEmailHtml = (data: ContactFormData): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Service:</strong> ${data.service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        This message was sent from the Socialsyn contact form.
      </p>
    </div>
  `;
};

export const sendContactEmail = async (data: ContactFormData): Promise<void> => {
  const transporter = createEmailTransporter();
  
  const mailOptions: EmailConfig = {
    from: process.env.EMAIL_USER || '',
    to: process.env.CONTACT_EMAIL || 'info@socialsyn.com',
    subject: `New Contact Form Submission from ${data.name}`,
    html: generateContactEmailHtml(data)
  };

  await transporter.sendMail(mailOptions);
};


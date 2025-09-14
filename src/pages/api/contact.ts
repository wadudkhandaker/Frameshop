import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  customer: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { customer, subject, message }: ContactFormData = req.body;

    // Validate required fields
    if (!customer || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Send email to admin
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'ronniehaque@gmail.com',
      subject: `[Frameshop Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Details</h3>
            <p><strong>From:</strong> ${customer}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <div style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
            <p><strong>Website:</strong> frameshop.com.au</p>
            <p><strong>IP Address:</strong> ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: customer,
      subject: 'Thank you for contacting Frameshop',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
          
          <p>Dear ${customer.split('@')[0]},</p>
          
          <p>We have received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>If you have any urgent inquiries, please don't hesitate to call us at <strong>1300 676 020</strong>.</p>
          
          <p>Best regards,<br>
          <strong>Frameshop Team</strong><br>
          <a href="https://frameshop.com.au">frameshop.com.au</a></p>
        </div>
      `,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
}

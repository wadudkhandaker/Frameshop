# Email Setup Guide

## Contact Form Email Functionality

The contact form is now fully functional and will send emails to `ronniehaque@gmail.com` when users submit the form.

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail App Password Setup

For Gmail, you'll need to use an App Password instead of your regular password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Enable 2-Step Verification if not already enabled
3. Go to Security > App passwords
4. Generate a new app password for "Mail"
5. Use that password in the `EMAIL_PASS` environment variable

### 3. Alternative Email Services

You can also use other email services by modifying the transporter configuration in `/src/pages/api/contact.ts`:

#### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

#### For Yahoo:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'yahoo',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

#### For Custom SMTP:
```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Features

### ✅ Contact Form Features:
- **Email validation** - Ensures valid email format
- **Required field validation** - All fields must be filled
- **Loading states** - Shows "Sending..." while processing
- **Success/Error messages** - Clear feedback to users
- **Form reset** - Clears form after successful submission
- **Rich text editor toolbar** - Visual formatting options
- **Direct email link** - Alternative way to contact

### ✅ Email Features:
- **Professional HTML email** - Well-formatted email template
- **Contact information** - Includes sender's email and subject
- **Message formatting** - Preserves line breaks and formatting
- **Error handling** - Graceful error handling and user feedback
- **Security** - Uses environment variables for credentials

### ✅ User Experience:
- **Responsive design** - Works on all devices
- **Accessibility** - Proper labels and ARIA attributes
- **Visual feedback** - Clear success/error states
- **Alternative contact** - Direct email link as backup

## Testing

1. Fill out the contact form on `/contact`
2. Submit the form
3. Check `ronniehaque@gmail.com` for the received email
4. Verify the email contains all form data correctly

## Troubleshooting

### Common Issues:

1. **"Method not allowed" error**
   - Ensure the form is submitting via POST method

2. **"Please fill in all required fields" error**
   - Check that all fields (customer, subject, message) are filled

3. **Email sending fails**
   - Verify environment variables are set correctly
   - Check email credentials are valid
   - Ensure App Password is used for Gmail

4. **Environment variables not loading**
   - Restart the development server after adding `.env.local`
   - Ensure the file is in the project root

## Security Notes

- Never commit `.env.local` to version control
- Use App Passwords instead of regular passwords
- Consider rate limiting for production use
- Validate and sanitize all form inputs 
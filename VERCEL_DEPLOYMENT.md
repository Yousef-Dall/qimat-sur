# Vercel Deployment Guide for QSMT Contact Form

## 🚀 Your contact form will work perfectly on Vercel!

Since you're using Vercel, your original Node.js email API will work as a serverless function. Here's how to set it up:

## 📧 Environment Variables Setup

In your Vercel dashboard, go to your project settings and add these environment variables:

### Required Variables:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yousef.n.d.2002@gmail.com
SMTP_PASS=your_gmail_app_password_here
SMTP_FROM=yousef.n.d.2002@gmail.com
TO_EMAIL=yousef.n.d.2002@gmail.com
ALLOW_ORIGINS=https://qimat-surtrd.com,https://your-vercel-app.vercel.app,http://localhost:3000
```

## 🔑 Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Factor Authentication** if not already enabled
3. Go to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy this 16-character password (e.g., `abcd efgh ijkl mnop`)
6. Use this as your `SMTP_PASS` environment variable (without spaces)

## 🔧 Vercel Configuration

The `vercel.json` file is already configured to:
- Handle the `/api/send-email` endpoint as a serverless function
- Set proper routing for API calls
- Configure function timeout (10 seconds)

## 📋 Deployment Checklist

### ✅ Files Ready:
- `api/send-email.js` - Serverless email function
- `vercel.json` - Vercel configuration
- `ContactSection.jsx` - Contact form (restored to use API)
- `package.json` - Dependencies including nodemailer

### ✅ What Happens:
1. **User submits form** → Frontend sends POST to `/api/send-email`
2. **Vercel serverless function** → Processes the request
3. **Gmail SMTP** → Sends email to `yousef.n.d.2002@gmail.com`
4. **Success response** → User sees confirmation message

## 🌐 Domain Configuration

Update your `ALLOW_ORIGINS` to include:
- Your custom domain: `https://qimat-surtrd.com`
- Your Vercel preview URLs
- Localhost for development: `http://localhost:3000`

## 🧪 Testing

### Local Testing:
Your contact form will show an error locally since the serverless function only works on Vercel. This is normal!

### Production Testing:
1. Deploy to Vercel
2. Set environment variables
3. Test the contact form on your live site
4. Check email delivery to `yousef.n.d.2002@gmail.com`

## 🚀 Deploy Now

1. **Push your code** to GitHub
2. **Connect to Vercel** (if not already connected)
3. **Set environment variables** in Vercel dashboard
4. **Deploy** - your contact form will work immediately!

## 📧 Email Format

Customers will receive a confirmation, and you'll get emails formatted like:

**Subject:** 🔧 QSMT Contact from [Customer Name]

**Content:**
- Customer details (name, email, phone)
- Their message
- Language preference
- Direct reply-to customer email

## ✨ Advantages of Vercel Approach

✅ **No third-party dependencies** (like EmailJS)
✅ **Full control** over email content and styling  
✅ **Professional email templates**
✅ **Direct Gmail integration**
✅ **Free on Vercel** (within limits)
✅ **Honeypot spam protection** built-in
✅ **CORS properly handled**

---

**Ready to deploy?** Just set up the Gmail app password and environment variables in Vercel!
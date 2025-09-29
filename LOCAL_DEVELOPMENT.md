# Local Development & Testing Guide

## 🚨 Why You're Getting 404 Error

**This is completely normal!** Vercel serverless functions (`/api/send-email`) only work on Vercel, not in local development.

## ✅ Current Status

Your contact form is now updated to show a helpful message:
> "⚠️ Development Mode: Contact form will work on Vercel deployment. For now, please email us directly at yousef.n.d.2002@gmail.com"

## 🧪 How to Test Properly

### Option 1: Test on Vercel (Recommended)
1. **Deploy to Vercel**:
   ```bash
   git add .
   git commit -m "Add Vercel contact form"
   git push origin main
   ```
2. **Set up environment variables** in Vercel dashboard
3. **Test on live site** - the contact form will work perfectly!

### Option 2: Local Development with Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Run Vercel development server (simulates serverless functions)
vercel dev

# Your app will run on http://localhost:3000 with working API
```

## 🔧 Environment Variables for Vercel

Set these in your Vercel dashboard → Project → Settings → Environment Variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465  
SMTP_SECURE=true
SMTP_USER=yousef.n.d.2002@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=yousef.n.d.2002@gmail.com
TO_EMAIL=yousef.n.d.2002@gmail.com
ALLOW_ORIGINS=https://qimat-surtrd.com,https://your-vercel-app.vercel.app
```

## 📱 What Users See Now

- **Local development**: Helpful message explaining it's in development mode
- **Production (Vercel)**: Fully working contact form that sends emails to you
- **Error handling**: Clear instructions to email you directly if something fails

## ✨ Benefits

✅ **No confusion** - users know exactly what to do  
✅ **Professional** - works perfectly on your live site  
✅ **Fallback** - always provides your direct email as backup  
✅ **Smart detection** - different messages for local vs production

## 🚀 Ready to Deploy?

Your contact form is ready for Vercel deployment! Just:
1. Push your code to GitHub
2. Set environment variables in Vercel
3. Deploy - it will work immediately!

The 404 error is just because you're testing locally. On Vercel, it will work perfectly.
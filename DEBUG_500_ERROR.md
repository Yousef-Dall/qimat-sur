# 🔧 Vercel 500 Error - Debug Checklist

## Most Common Causes of 500 Error:

### 1. ❌ **Missing Environment Variables**
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yousef.n.d.2002@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM=yousef.n.d.2002@gmail.com
TO_EMAIL=yousef.n.d.2002@gmail.com
```

### 2. 🔑 **Gmail App Password Issues**

**Step-by-Step Gmail Setup:**
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. **Enable 2-Factor Authentication** (required for app passwords)
3. Search for "App passwords" or go to Security → 2-Step Verification → App passwords
4. Generate password for "Mail" or "Other (Custom name)"
5. Copy the 16-character password (like: `abcd efgh ijkl mnop`)
6. **Remove spaces**: `abcdefghijklmnop`
7. Use this as your `SMTP_PASS` in Vercel

### 3. 📋 **Environment Variable Checklist:**

- [ ] All variables are set in Vercel (not just locally)
- [ ] No extra spaces in values
- [ ] Gmail app password is 16 characters without spaces
- [ ] You've redeployed after adding environment variables
- [ ] TO_EMAIL is set to `yousef.n.d.2002@gmail.com`

## 🔍 **Debug Steps:**

### Step 1: Check Logs
1. Go to Vercel Dashboard → Your Project → Functions
2. Click on `/api/send-email`
3. Check the logs for detailed error messages

### Step 2: Test Gmail Credentials
Try sending a test email with the same credentials using any email client to verify they work.

### Step 3: Common Issues:
- **"Invalid login"** → Wrong app password or 2FA not enabled
- **"Authentication failed"** → Incorrect SMTP_USER email
- **"Connection timeout"** → Wrong SMTP_HOST or PORT
- **"Missing credentials"** → Environment variables not set

## 🚀 **Quick Fix:**

1. **Set all environment variables** in Vercel
2. **Redeploy** (important after adding env vars)
3. **Test again**

## 📧 **Test Environment Variables:**

If you want to verify your setup, I can create a simple test endpoint to check if your SMTP credentials work.

---

**Need help with a specific error message?** Share the exact error from Vercel logs and I'll help fix it immediately!
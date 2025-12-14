# Email Setup Guide for NeuroVita Berlin

This guide explains how to configure email functionality for the contact form using Vercel serverless functions.

## Prerequisites

- Email account: `info@neurovita-berlin.de` set up and accessible
- Know your email provider's SMTP settings (see common providers below)

## Step 1: Find Your Email Provider's SMTP Settings

You need to know which email provider hosts your `info@neurovita-berlin.de` email. Common providers:

### **Strato** (likely your provider)
- **Host:** `smtp.strato.de`
- **Port:** `465` (SSL) or `587` (TLS)
- **Security:** SSL/TLS

### **Gmail**
- **Host:** `smtp.gmail.com`
- **Port:** `587` (TLS)
- **Note:** You'll need to use an App Password, not your regular password

### **Outlook/Office365**
- **Host:** `smtp.office365.com`
- **Port:** `587` (TLS)

### **Other Providers**
Contact your email provider for SMTP settings.

## Step 2: Configure Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your `neurovita` project
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Add the following variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `EMAIL_HOST` | Your SMTP host | `smtp.strato.de` |
| `EMAIL_PORT` | SMTP port | `465` or `587` |
| `EMAIL_USER` | Your email address | `info@neurovita-berlin.de` |
| `EMAIL_PASS` | Your email password | `your-secure-password` |
| `EMAIL_TO` | Recipient email | `info@neurovita-berlin.de` |

**Important:**
- Make sure to add these variables to **all environments** (Production, Preview, Development)
- Click "Save" after adding each variable
- Keep `EMAIL_PASS` secure - never commit it to Git

## Step 3: Deploy

After setting the environment variables:

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add email functionality with Vercel serverless function"
   git push origin main
   ```

2. Vercel will automatically deploy your changes

3. The email function will be available at: `https://your-domain.com/api/send-email`

## Step 4: Test the Form

1. Visit your website
2. Fill out the contact form
3. Click "Termin anfragen"
4. You should see a success message
5. Check `info@neurovita-berlin.de` inbox for the email

## Troubleshooting

### Email not sending?

1. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Click on "Functions" tab → "send-email"
   - Check logs for errors

2. **Common issues:**
   - **"Invalid login"**: Wrong email password or username
   - **"Connection timeout"**: Wrong SMTP host or port
   - **"TLS error"**: Try switching between port 465 and 587
   - **Gmail "Less secure app"**: Use App Password instead of regular password

3. **Verify environment variables:**
   - Go to Vercel Settings → Environment Variables
   - Make sure all 5 variables are set correctly
   - Redeploy after changing variables

### How to get SMTP settings from your email provider

1. **Check your email provider's documentation** (search "SMTP settings [provider name]")
2. **Contact your email provider's support**
3. **Check your email client settings** (Outlook, Thunderbird, etc.)

### Gmail App Password (if using Gmail)

1. Enable 2-Factor Authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate an App Password for "Mail"
4. Use this 16-character password as `EMAIL_PASS`

## Security Notes

- ✅ Environment variables are encrypted by Vercel
- ✅ They're never exposed in frontend code
- ✅ Email password is never committed to Git
- ✅ HTTPS encrypts all communication
- ❌ Never hardcode email credentials in code
- ❌ Never commit `.env` files to Git

## Local Development (Optional)

To test locally:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Create `.env` file in project root:
   ```
   EMAIL_HOST=smtp.strato.de
   EMAIL_PORT=465
   EMAIL_USER=info@neurovita-berlin.de
   EMAIL_PASS=your-password
   EMAIL_TO=info@neurovita-berlin.de
   ```

3. Add `.env` to `.gitignore`:
   ```bash
   echo ".env" >> .gitignore
   ```

4. Run locally:
   ```bash
   vercel dev
   ```

## Files Created

- `package.json` - Dependencies (nodemailer)
- `api/send-email.js` - Serverless function for sending emails
- `js/script.js` - Updated form handler to call API

## Support

If you need help:
1. Check Vercel function logs
2. Verify all environment variables are set
3. Test with a simple email client to confirm SMTP settings work
4. Contact your email provider for SMTP issues

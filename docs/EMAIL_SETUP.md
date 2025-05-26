# Email Setup Guide for Contact Form

## Overview
The contact form uses [Resend](https://resend.com) to send emails. This guide covers the complete setup process.

## Current Status ✅
- ✅ Resend package installed (`resend@^4.1.1`)
- ✅ Environment variables configured
- ✅ Contact form implemented with validation
- ✅ Rate limiting (5 requests/hour per IP)
- ✅ Input sanitization and spam protection

## Required Setup Steps

### 1. Domain Verification (Critical for Production)

**Current Issue**: Using `noreply@kfcfreight.com` which needs domain verification.

**Steps to fix**:
1. Go to [Resend Dashboard → Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `kfcfreight.com`)
4. Add the required DNS records to your domain provider:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
5. Wait for verification (usually takes a few minutes)

**Alternative for testing**: Use `onboarding@resend.dev` (already works, but only for testing)

### 2. Environment Variables

**Local Development** (✅ Already configured):
- `.env`: `RESEND_API_KEY=re_icVGkVhK_9Zm8448yP2V2zWvt3mK6SXZE`
- `.dev.vars`: Same value for Cloudflare Workers local development

**Production Deployment**:
1. Go to Cloudflare Dashboard
2. Navigate to Pages → Your Project → Settings → Environment Variables
3. Add: `RESEND_API_KEY` = `re_icVGkVhK_9Zm8448yP2V2zWvt3mK6SXZE`

### 3. Email Configuration

**Current Settings**:
```typescript
await resend.emails.send({
  from: "noreply@kfcfreight.com", // Update after domain verification
  to: ["anlstudio.kfc@gmail.com"], // Your receiving email
  replyTo: email, // Customer's email for replies
  subject: `Contact Form: ${subject}`,
  // HTML email content with customer details
});
```

**To customize**:
- Update `from` email after domain verification
- Update `to` email array for multiple recipients
- Customize email template in the `html` field

## Testing

### Local Testing
```bash
bun dev
# Visit http://localhost:5173/contact-us
# Fill out and submit the form
```

### Production Testing
1. Deploy to Cloudflare Pages
2. Ensure environment variables are set
3. Test with a real email submission
4. Check email delivery and spam folders

## Security Features

### Rate Limiting
- 5 requests per hour per IP address
- Automatic cleanup of old requests
- Returns 429 status for rate-limited requests

### Input Validation
- Name: 2-100 characters
- Email: Valid email format
- Subject: 3-200 characters  
- Message: 10-5000 characters
- No URLs allowed in message (spam protection)

### Input Sanitization
- HTML entities encoded to prevent XSS
- All inputs trimmed and sanitized

## Troubleshooting

### Common Issues

1. **"Domain not verified" error**
   - Solution: Complete domain verification in Resend dashboard

2. **Environment variable not found**
   - Local: Check `.env` and `.dev.vars` files
   - Production: Check Cloudflare Pages environment variables

3. **Rate limiting too strict**
   - Adjust `MAX_REQUESTS` and `RATE_LIMIT_WINDOW` in the code

4. **Emails going to spam**
   - Complete domain verification
   - Set up DMARC policy
   - Use a dedicated sending domain

### Debug Mode
Add this to your action function for debugging:
```typescript
console.log("Environment check:", {
  hasApiKey: !!env.RESEND_API_KEY,
  apiKeyLength: env.RESEND_API_KEY?.length
});
```

## Email Template Customization

The current email template includes:
- Customer name and email
- Subject line
- Message content
- Footer with source identification

To customize, modify the `html` field in the `resend.emails.send()` call.

## Monitoring

Consider setting up:
- Email delivery monitoring
- Error logging for failed sends
- Analytics for form submissions

## Next Steps

1. ✅ **Immediate**: Test current implementation locally
2. 🔄 **Short-term**: Set up domain verification
3. 📈 **Long-term**: Add email templates, monitoring, and analytics

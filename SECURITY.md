# Security Notice

## Environment Variables Security

This project uses environment variables to store sensitive configuration like database credentials and API keys.

### Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your credentials:**
   - Open `.env` and replace all placeholder values with your actual credentials
   - Never commit `.env` to git (it's already in `.gitignore`)

3. **Required environment variables:**
   - `DATABASE_URL` - PostgreSQL connection string from Neon
   - `RESEND_API_KEY` - Email API key from Resend
   - `ADMIN_EMAIL` - Email address for notifications

### Credential Rotation Required ⚠️

**IMPORTANT:** If you've been using this repository before this security update, your credentials may have been exposed in git history or the repository.

You should rotate (change) the following credentials:

#### 1. Neon Database Password

1. Log into your Neon console: https://console.neon.tech
2. Navigate to your project
3. Go to **Settings** → **General**
4. Click **Reset password** to generate a new password
5. Update your `.env` file with the new `DATABASE_URL`

#### 2. Resend API Key

1. Log into Resend: https://resend.com/api-keys
2. Delete the old API key
3. Create a new API key
4. Update your `.env` file with the new `RESEND_API_KEY`

### Best Practices

✅ **DO:**
- Keep `.env` files out of version control
- Use different credentials for development and production
- Rotate credentials regularly
- Use `.env.local` for local overrides (also gitignored)

❌ **DON'T:**
- Commit `.env` files to git
- Share credentials in chat, email, or documentation
- Use production credentials in development
- Hard-code credentials in source code

### Deployment

When deploying to production (Vercel, Netlify, etc.), add environment variables through your hosting platform's dashboard, not through `.env` files.

**Vercel:**
- Project Settings → Environment Variables
- Add each variable separately

**Netlify:**
- Site Settings → Build & Deploy → Environment
- Add each variable separately

### Checking for Exposed Secrets

If you suspect credentials were committed to git, you can check:

```bash
# Search git history for potential secrets
git log --all --full-history -p -- .env
```

If secrets are found in git history, you MUST:
1. Rotate all exposed credentials immediately
2. Consider using a tool like `git-filter-repo` to remove sensitive data from history
3. Force push the cleaned history (coordinate with your team first)

### Need Help?

If you discover a security issue, please:
1. **Do not** create a public GitHub issue
2. Rotate the affected credentials immediately
3. Contact the project maintainer directly

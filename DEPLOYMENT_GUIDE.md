# 🚀 Deployment Guide - Vercel

Complete step-by-step guide to deploy House of Clarence to Vercel.

## Prerequisites

- GitHub account with your project pushed
- Supabase account with active project
- Vercel account (free)

## Step 1: Prepare Your Project

### 1.1 Test Build Locally
```bash
npm run build
npm run start
```

If successful, you'll see: ✓ Ready - started server on 0.0.0.0:3000

### 1.2 Update next.config.ts (Optional)

If you haven't already, ensure your `next.config.ts` is optimized:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizations
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-domain.com',
      },
    ],
  },
};

export default nextConfig;
```

### 1.3 Commit Changes
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Deploy on Vercel

### 2.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub
- Authorize Vercel to access your repositories

### 2.2 Create New Project
1. Click "New Project"
2. Find and select your `house_of_clarence` repository
3. Click "Import"

### 2.3 Configure Project
**Framework**: Already detected as "Next.js" ✓

**Root Directory**: Set to `./` (default)

**Build & Development Settings** (usually auto-detected):
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

### 2.4 Add Environment Variables
1. Before clicking "Deploy", click "Environment Variables"
2. Add these variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

**Example values:**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.5 Deploy
Click "Deploy" and wait for the build to complete.

**This should take 2-5 minutes**

## Step 3: Configure Supabase

After deployment, you need to allow your Vercel URL in Supabase:

### 3.1 Get Your Vercel URL
- In Vercel dashboard, find your project
- Copy the production URL (e.g., `https://house-of-clarence.vercel.app`)

### 3.2 Update Supabase Auth Settings
1. Go to Supabase dashboard
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add your Vercel URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

### 3.3 Update CORS Settings (if needed)
1. Go to **Project Settings** → **API**
2. Update CORS configuration to allow your Vercel domain

## Step 4: Test Deployment

### 4.1 Visit Your Live Site
Open your Vercel URL and test:
- [ ] Navigation works
- [ ] Pages load correctly
- [ ] Home page displays
- [ ] Login/Signup works
- [ ] Products load from database
- [ ] No console errors

### 4.2 Test Core Features
```
- [ ] Can navigate to Shop page
- [ ] Can navigate to Market page
- [ ] Can view products
- [ ] Can go to Cart page
- [ ] Can click Profile (redirects to login if not signed in)
- [ ] Can create account
- [ ] Can login
- [ ] Can update profile
- [ ] Can logout
```

## Step 5: Continuous Deployment

Every time you push to your main branch:
1. Vercel automatically detects changes
2. Triggers a new build
3. Deploys automatically if build succeeds
4. Old deployments remain as previews

### Disable Auto-Deployment (Optional)
If you want to manually approve deployments:
1. In Vercel project settings
2. Go to **Git** → **Deploy on push**
3. Toggle OFF

## Step 6: Monitor & Maintain

### 6.1 Monitor Errors
- In Vercel dashboard: **Monitoring** tab shows errors
- Check Supabase logs for database issues
- Use browser DevTools for frontend issues

### 6.2 Scale Resources (if needed)
Vercel automatically scales, but you can:
- Upgrade to Vercel Pro for more serverless functions
- Configure caching headers in `next.config.ts`
- Optimize database queries

### 6.3 Update Environment Variables
If credentials change:
1. Go to Vercel project **Settings** → **Environment Variables**
2. Update values
3. Click "Save"
4. Manual redeploy needed (click "Deployments" → "3-dot menu" → "Redeploy")

## Troubleshooting

### Build Fails
**Error:** `Module not found`
- Solution: Check `package.json`, run `npm install` locally, commit again

**Error:** Environment variables not found
- Solution: Verify they're added in Vercel, they must be public (NEXT_PUBLIC_*)

### API Routes Don't Work
**Error:** 404 on /api/products
- Solution: Check `app/api/products/route.ts` exists, restart build

### Database Connection Issues
**Error:** 502 Bad Gateway
- Solution: Check Supabase URL/key are correct, verify RLS policies

### CORS Errors
**Error:** `Cross-Origin Request Blocked`
- Solution: Add Vercel URL to Supabase CORS settings

## Performance Tips

1. **Enable Caching**
```typescript
// In next.config.ts
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
};
```

2. **Optimize Images**
- Use Next.js Image component
- Compress images before uploading
- Use CDN for static assets

3. **Monitor Performance**
- Use Vercel Analytics (Pro)
- Check Core Web Vitals
- Monitor serverless function execution time

## Domain Setup (Optional)

To use a custom domain:

1. In Vercel project **Settings** → **Domains**
2. Enter your domain (e.g., `houseofclarence.com`)
3. Update DNS records as shown by Vercel
4. Wait for SSL certificate (can take 30 min)

## Next Steps

✅ Your app is live!

Now consider:
- [ ] Setup custom domain
- [ ] Enable Analytics
- [ ] Add monitoring/alerts
- [ ] Setup CI/CD pipeline
- [ ] Implement payment processing
- [ ] Add email notifications
- [ ] Launch marketing campaign

## Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment/vercel)
- [Supabase with Vercel](https://supabase.com/docs/guides/getting-started/architecture#edge-functions)

---

**Happy deploying! 🚀**

# Facebook Comments Setup Instructions

Your blog now has Facebook Comments integrated! This ensures only legitimate Facebook users can leave comments, eliminating the need for a custom login system.

## What You Need to Do

To activate the comments, you need to create a Facebook App and add your App ID to the code.

### Step 1: Create a Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Click "My Apps" in the top-right corner
3. Click "Create App"
4. Select "Consumer" or "Business" as the app type
5. Fill in your app details:
   - **App Name**: "Abundance Seedlings Blog" (or similar)
   - **App Contact Email**: Your business email
6. Click "Create App"

### Step 2: Add Facebook Login Product

1. In your app dashboard, find "Add Products" in the left sidebar
2. Find "Facebook Login" and click "Set Up"
3. Choose "Web" as your platform
4. Enter your website URL: `https://fin13y.github.io`
5. Save changes

### Step 3: Configure App Settings

1. Go to "Settings" → "Basic" in the left sidebar
2. Copy your **App ID** (you'll need this!)
3. Add your domain to "App Domains": `fin13y.github.io`
4. Scroll down to "Add Platform" and click it
5. Choose "Website"
6. Add your Site URL: `https://fin13y.github.io`
7. Save changes

### Step 4: Make Your App Live

1. In the top bar, you'll see a toggle that says "In Development"
2. Switch it to "Live" (this makes comments work for everyone, not just you)
3. You may need to provide a Privacy Policy URL - you can add this later or use your contact page URL for now

### Step 5: Update Your Website Code

1. Open `blog.html` in your website files
2. Find this line (near the top of the file):
   ```html
   <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v18.0&appId=YOUR_FACEBOOK_APP_ID" nonce="RANDOM_NONCE"></script>
   ```
3. Replace `YOUR_FACEBOOK_APP_ID` with your actual App ID from Step 3
4. Replace `RANDOM_NONCE` with any random string (e.g., `abc123xyz789`)
5. Save and upload the file

### Step 6: Test Your Comments

1. Visit your blog page
2. Scroll down to any blog post
3. You should see the Facebook comments box
4. Try leaving a comment - you'll be prompted to log in with Facebook first
5. Only Facebook users can comment!

## Features

✅ **Mandatory Facebook Login**: Users MUST be logged into Facebook to comment
✅ **No Spam**: Facebook's built-in spam filtering
✅ **Real Identities**: Comments come from real Facebook profiles
✅ **Moderation**: You can moderate comments from the Facebook App dashboard
✅ **Mobile Friendly**: Works perfectly on all devices
✅ **Notifications**: You can receive email notifications for new comments

## Moderating Comments

1. Go to your [Facebook App Dashboard](https://developers.facebook.com/apps/)
2. Select your app
3. Go to "Products" → "Comments"
4. You can view, approve, or delete comments from here
5. Set up moderation tools and blacklists if needed

## Troubleshooting

**Comments not showing?**
- Make sure you replaced YOUR_FACEBOOK_APP_ID with your actual App ID
- Check that your app is set to "Live" mode
- Verify your domain is added to App Domains in settings

**"App Not Set Up" error?**
- Make sure you added Facebook Login as a product
- Verify your website URL is correct in the app settings
- Check that your app is approved and live

**Need help?**
- Check the [Facebook Comments Plugin Documentation](https://developers.facebook.com/docs/plugins/comments/)
- Visit [Facebook Developer Support](https://developers.facebook.com/support/)

## Privacy & Data

Facebook Comments complies with GDPR and other privacy regulations. Users' Facebook data is not shared with you - Facebook handles all the authentication and data storage. You only see the public comments they leave.

---

**Note**: Once set up, comments are stored by Facebook, not on your website. This means they're backed up and managed by Facebook's infrastructure.

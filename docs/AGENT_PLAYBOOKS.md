# Agent Playbooks

## Configure Google Analytics (GA4) [UI Only]
1. Open https://analytics.google.com (correct account).
2. Admin → Create Property (GA4): name "Blog – andrescarreno.co".
3. Data Streams → Web → Add stream:
   - URL: https://blog.andrescarreno.co
   - Name: Website
   - Enhanced measurement: ON
4. Copy "Measurement ID" (G-XXXXXXXXXX). Return it to the user.

## Configure Squarespace DNS for Custom Domain [UI Only]
1. Squarespace → Settings → Domains → andrescarreno.co → DNS.
2. Add CNAME:
   - Host: blog
   - Target: andrscrrn.github.io
3. (Optional) Apex A records to GitHub Pages IPs.
4. Wait 10–60 min. Verify HTTPS in GitHub Pages.

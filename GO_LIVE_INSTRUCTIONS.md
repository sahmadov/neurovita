# 🚀 Go Live Instructions - 01.01.2026

## Quick Start

When you're ready to launch the full website on **January 1st, 2026**, follow these simple steps:

### Option 1: Command Line (Fastest)

Open your terminal in the project directory and run:

```bash
rm index.html
mv index-main.html index.html
rm css/coming-soon.css
```

### Option 2: Manual Steps

1. **Delete** the temporary coming soon page:
   - Delete: `index.html`

2. **Rename** the main website file:
   - Rename: `index-main.html` → `index.html`

3. **Delete** the temporary CSS file:
   - Delete: `css/coming-soon.css`

4. **Done!** Your full website is now live.

---

## What Was Changed?

### Current Setup (Before 01.01.2026)
- `index.html` - Temporary "coming soon" landing page
- `index-main.html` - Your full website (hidden)
- `css/coming-soon.css` - Temporary styles for coming soon page

### After Going Live (01.01.2026)
- `index.html` - Your full website (visible to visitors)
- All temporary files removed

---

## Files Overview

### Temporary Files (Will be deleted)
- `/index.html` - Coming soon page
- `/css/coming-soon.css` - Coming soon styles

### Permanent Files (Your actual website)
- `/index-main.html` - Full practice website (will become index.html)
- `/css/styles.css` - Main website styles
- `/js/script.js` - Main website scripts
- All other files remain unchanged

---

## Testing Before Launch

To preview the full website before going live:

1. Open `index-main.html` directly in your browser
2. Or temporarily rename files to test:
   ```bash
   mv index.html index-temp.html
   mv index-main.html index.html
   # Test the website
   mv index.html index-main.html
   mv index-temp.html index.html
   ```

---

## Need Help?

If you encounter any issues during the transition:

1. Make sure you're in the correct directory
2. Check that all files exist before running commands
3. Consider making a backup before making changes:
   ```bash
   cp -r . ../neurovita-backup
   ```

---

**Current Status:** Temporary coming soon page is active ✅
**Go Live Date:** January 1st, 2026 📅
**Estimated Time to Switch:** Less than 1 minute ⚡

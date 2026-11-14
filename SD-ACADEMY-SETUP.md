# SD Academy PWA — setup guide

Website: https://sdacademyjhabua.blogspot.com/

This project is customized from `bloggerkit/blogger-pwa` for SD Academy.

**Dedicated repository:** `sd-academy-pwa`. This is separate from any other Blogger PWA repository you already use.

## Deployment method for this website

Because the site is hosted on a `blogspot.com` subdomain, use **jsDelivr (CDN)**. Do not deploy the Cloudflare Worker route for this Blogspot hostname. The CDN method provides the installable app manifest and icons, but it cannot register a same-origin service worker. Therefore the offline fallback page and OneSignal push notifications are not available with this method.

## 1. Publish this source to your GitHub account

1. Sign in to GitHub and create a **new public** repository named `sd-academy-pwa` (keep your existing `blogger-pwa` repository unchanged).
2. Upload the contents of this ZIP to the repository root (the files `package.json`, `pwa.config.ts`, `src/`, `bucket/`, `uploads/` must be at the root, not inside another nested folder).
3. In **Settings → Actions → General → Workflow permissions**, allow read and write permissions if the repository asks for it.
4. Open the **Actions** tab and enable workflows if GitHub prompts you.
5. The workflow runs `pnpm run generate` and regenerates the `bucket/` and `output/` files using the actual GitHub repository name. Wait for the workflow to finish successfully.

The repository must be public for the standard jsDelivr GitHub CDN URL used by this project.

## 2. Add the generated PWA tags to Blogger

1. Open the GitHub repository after the workflow completes.
2. Open `output/cdn-metatags.html` and copy its complete contents.
3. In Blogger, open **Theme → Edit HTML**.
4. Find the opening `<head>` tag and paste the copied PWA meta tags immediately after it.
5. Save the theme.
6. Remove any older PWA manifest/icon tags if you previously added another PWA package. Do not remove the normal SD Academy favicon/SEO/Open Graph tags unless they are exact duplicates of the new PWA tags.

**Important:** Use `output/cdn-metatags.html`, not `pwa-metatags.html`. For this Blogspot deployment, do not add `/app/pwa.js` or `/app/serviceworker.js` script tags; those are for the same-origin Cloudflare Worker deployment and will not work from the jsDelivr method.

## 3. Optional custom Install App button

Chrome/Edge may show their own install option when the site is eligible. If you want a visible button in the theme, add this HTML where you want the button to appear (for example, near the main header actions):

```html
<button id="sd-pwa-install" type="button" hidden>Install SD Academy App</button>
```

Add this CSS before `</head>`:

```html
<style>
#sd-pwa-install{border:0;border-radius:999px;padding:11px 17px;background:#0F172A;color:#fff;font:700 14px/1.2 inherit;cursor:pointer;box-shadow:0 8px 22px rgba(15,23,42,.18)}
#sd-pwa-install[hidden]{display:none}
</style>
```

Add this script just before `</body>` (inside a Blogger XML theme, wrap the JavaScript in `//<![CDATA[` and `//]]>` if the editor requires CDATA):

```html
<script>
//<![CDATA[
(function(){
  var installButton=document.getElementById('sd-pwa-install');
  if(!installButton) return;
  var installPrompt=null;
  window.addEventListener('beforeinstallprompt',function(event){
    event.preventDefault();
    installPrompt=event;
    installButton.hidden=false;
  });
  installButton.addEventListener('click',async function(){
    if(!installPrompt) return;
    installButton.disabled=true;
    await installPrompt.prompt();
    installPrompt=null;
    installButton.disabled=false;
    installButton.hidden=true;
  });
  window.addEventListener('appinstalled',function(){
    installPrompt=null;
    installButton.hidden=true;
  });
})();
//]]>
</script>
```

The button appears only when the browser fires `beforeinstallprompt`. On iPhone/iPad, users may need to use Safari's Share menu → **Add to Home Screen** instead.

## 4. Refresh CDN cache after later changes

The GitHub workflow requests jsDelivr cache purges for changed `bucket/` files. If an update still appears stale, use https://www.jsdelivr.com/tools/purge for the affected CDN URL.

## SD Academy app settings

- App name: SD Academy
- Short name: SD Academy
- Website: https://sdacademyjhabua.blogspot.com/
- Theme color: `#0F172A` (the navy used in the SD Academy Blogger theme)
- Background color: `#F8FAFC`
- Language: `en-IN`
- App shortcuts: Courses, Live Classes, Mock Tests
- Push notifications: disabled (requires the same-origin Cloudflare Worker setup and a OneSignal app)
- Offline service worker: not available through jsDelivr on the Blogspot hostname

## Notes

- This ZIP does not modify your Blogger theme XML or Firebase/CBT/student-login code. It only prepares the PWA source and the integration instructions.
- The generated app icon is a newly prepared SD Academy monogram icon. If you have a final official SD Academy logo/icon, replace `uploads/favicon.png` with a square PNG of at least 512×512 and let GitHub Actions regenerate the icons.

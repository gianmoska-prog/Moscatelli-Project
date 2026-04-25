# Moscatelli Studio — PWA Foundation

This package is the current web app shell plus Progressive Web App groundwork.

## Included
- installable PWA manifest
- Android / PWA icons
- Apple touch icon
- service worker for local asset caching
- standalone app metadata for mobile home-screen launch

## Deploy
Upload the entire folder contents to Netlify or GitHub Pages.

## Android installation
1. Open the deployed URL in Chrome.
2. Tap the browser menu.
3. Choose **Install app** or **Add to Home screen**.
4. The app will then appear on the phone like a normal installed web app.

## iPhone installation
1. Open the deployed URL in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**.
4. It will open in standalone mode after installation.

## Current scope
This is the installable shell only. Authentication is still front-end only and should be replaced before real internal deployment.


Version 18 adds a cinematic PIN threshold using access code 062026 for testing.


Update note: v22 bumps the service-worker cache key and adds the veil monogram asset to the precache list.

Update note: v43 replaces the manifest launch icons with neutral dark launch icons so Android's generated PWA splash screen cannot show the Moscatelli monogram before the in-app veil sequence. The visible favicon and Apple touch icon files remain untouched. Existing Android installs may need removal/reinstallation because Chrome/Android can retain installed-app splash metadata outside the service-worker cache.

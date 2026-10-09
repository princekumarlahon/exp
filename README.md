# For Monishaaaaaaa ♡

A mobile-first, interactive birthday story built with React, TypeScript, Vite, Framer Motion, SVG and CSS.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder and open a terminal inside it.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL Vite prints. To test on your phone, connect both devices to the same Wi-Fi and open the network URL shown by Vite.

## Build and deploy

```bash
npm run build
```

Import the repository into Vercel. Vercel should detect Vite automatically. Build command: `npm run build`; output directory: `dist`. The included `vercel.json` supports fallback routing.

## Add personal media later

Put assets in `public/images/memories/` and `public/videos/`, then edit `src/app/sceneConfig.ts` or the `MemoryGallery` scene. Suggested filenames:
- `public/images/memories/photo-01.jpg`
- `public/images/memories/photo-02.jpg`
- `public/videos/our-memory.mp4`

The gallery currently uses designed placeholders, so the story works before you add media.

## Personalise the writing

Edit `src/app/sceneConfig.ts`. The current tone is romantic, playful and heartfelt without assuming you are already in a relationship. Review every message so it sounds like you.

## Notes

- Audio starts only after a user gesture because mobile browsers restrict autoplay.
- Scene navigation supports taps and touch gestures; the slingshot supports pointer dragging.
- Reduced-motion preferences are respected for major scene transitions.

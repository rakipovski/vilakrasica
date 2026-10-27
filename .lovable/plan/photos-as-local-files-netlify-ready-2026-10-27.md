# Photos as local files (Netlify-ready)

Goal: every photo the site uses is stored inside the project and bundled into the production build, so it shows on Netlify. Design and content stay exactly the same.

## Steps
1. Download the 7 photos currently in use from the Lovable CDN into `src/assets/` as real `.jpg` files:
   hero-courts, hero-aerial, gallery-pool, sauna-jacuzzi-1, sauna-jacuzzi-2, gallery-terrace, terrace-sunset.
2. Verify each download is a valid JPEG with the same size as recorded in its pointer.
3. In `src/routes/index.tsx` and `src/routes/gallery.tsx`, replace the `.asset.json` imports with normal image imports (`import x from "@/assets/x.jpg"`) and use `x` instead of `x.url`. Variable names, order, alt text and layout unchanged.
4. Delete the now-unused `.asset.json` pointer files locally with `rm` (not the CDN delete command, so the current Lovable site and old versions keep working). Unused pointers `sauna-jacuzzi` and `tennis-court` are removed too.
5. Confirm no `__l5e` or `.asset.json` references remain in `src/`, the build passes, and the built output contains hashed `.jpg` files; check home and `/gallery` in the browser.

## Technical notes
- Vite emits imported images to `dist/assets/*.jpg` with hashed names, which Netlify serves as static files.
- Record in `AGENTS.md`: site images are local imports, not Lovable asset pointers, because the site is also hosted on Netlify.

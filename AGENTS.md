<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use Cloud Auth for visitor accounts without an additional profiles table; the requested account flow needs only email and password.
- Keep villa content public and manage session UI through a single root AuthProvider subscription; authentication does not restrict browsing.
- Return OAuth to the public /auth page and use the public /reset-password route for recovery; redirects must use the current origin.
- Site images are local imports from src/assets (no Lovable asset pointers) because the site is also hosted on Netlify.

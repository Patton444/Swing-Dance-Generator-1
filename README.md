# Country Swing Combo Generator

## Files
- `index.html` — web page
- `style.css` — appearance
- `app.js` — generator logic
- `country_swing_moves_clean.json` — move database and legal transitions

## Run it
Do not open `index.html` by double-clicking it; browsers may block the JSON file.

### Easiest: VS Code + Live Server
1. Install Visual Studio Code.
2. Install the `Live Server` extension.
3. Open this folder in VS Code.
4. Right-click `index.html`.
5. Choose `Open with Live Server`.

## Current features
- Starts every combo at Open.
- Uses only transitions in the move database.
- Filters dips, flips, and lifts/carries.
- Tries to avoid repetition.
- Restarts when it reaches a dead end.

## Next upgrades
- Starting-move selection.
- Difficulty filter.
- Minimum/maximum dips or flips.
- Exclude specific moves.
- Show descriptions.
- Save favorites.
- Add OpenAI-powered custom requests.

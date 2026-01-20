## How it Works (Technical)

Unlike simple extensions, Readster uses `chrome.storage.local` and a **Content Script Relay** to handle data. This means:
- **No Text Limits**: You can select entire books and send them; we don't rely on URL characters.
- **Improved Security**: Data is transferred via local storage and `postMessage`, never sent through URL params.
- **Reliability**: The extension is built with Manifest V3 standards.

## How to Install (Chrome / Edge / Brave)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked**.
4. Select the `readster-extension` folder in this project.

## How to Use

1. Highlight any text on a webpage.
2. Right-click the highlighted text.
3. Select **Read with Readster**.
4. A new tab will open with your selection loaded into the Readster app.

*Note: By default, the extension points to `http://localhost:5173/read`. If you deploy Readster, update the `READSTER_URL` constant in `background.js`.*

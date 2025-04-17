# Reddit Default Sort Chrome Extension

## Overview

Reddit Default Sort is a Chrome extension that lets users set default sorting preferences for Reddit’s home feed, subreddits, and user pages. Built with jQuery and vanilla JavaScript, this project enhances the Reddit browsing experience by automating sort preferences — perfect for users who want a tailored feed without manual adjustments.

This is my first Chrome extension, created to explore browser extension development, Web Components, and Chrome APIs like storage and content_scripts.

## Features

- Custom Sorting: Choose sorting options (e.g., Hot, New, Top, Rising, etc.) for Reddit’s home feed, subreddits, and user pages.
- Toggle Control: Enable or disable sorting for specific sections.
- Persistent Storage: Preferences are saved using chrome.storage.local and persist across sessions.
- jQuery-Powered UI: Popup UI built with jQuery and styled with Twitter Bootstrap for a modern look.
- No Build Step: Entire project runs without a build process, using vanilla JavaScript and libraries.

## Tech Stack

- jQuery (CDN): For the popup UI.
- Bootstrap: For styling the popup.
- Vanilla JavaScript: For content scripts and core logic.
- Chrome APIs: chrome.storage for saving preferences, chrome.runtime for communication, and content_scripts for URL manipulation.
- HTML/CSS: For structure and styling.

## How It Works

1. The popup (index.html) lets users select sorting preferences via a jQuery-based UI.
2. Preferences are saved to chrome.storage.local.
3. A content script (content.js) runs on Reddit pages, reads the saved preferences, and redirects the page to the desired sort (e.g., /hot, /top?t=all).

## Installation

1. Clone the repository: git clone https://github.com/LeeGrobler/reddit-default-sort.
2. Open Chrome and go to chrome://extensions/.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the project folder.
5. The extension will appear in your Chrome toolbar.

## Usage

1. Click the extension icon to open the popup.
2. Select your sorting preferences for home feed, subreddits, and user pages.
3. Toggle sorting on/off for each section.
4. Click "Save Preferences".
5. Visit Reddit - pages will automatically sort based on your settings.

## Challenges & Learnings

As my first Chrome extension, this project taught me:

- How to structure a Chrome extension with manifest.json.
- Using content_scripts to manipulate web pages dynamically.
- Integrating jQuery without a build step using CDNs.
- Working with Chrome APIs like storage and host_permissions.
- Debugging Content Security Policy (CSP) issues with CDNs.

## Future Improvements

- Integrate Web Components.
- Publish the extension to the Chrome Web Store.
- Add a custom extension icon.
- Add time range options for "Top" sorting (e.g. Today, This Week, etc.).
- Enhance the UI with more customization options.

## License

MIT License. Feel free to use, modify, and distribute!

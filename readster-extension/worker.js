// Load configuration
importScripts('config.js');
const READSTER_URL = CONFIG.READSTER_URL;

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "readWithReadster",
    title: "Read with Readster",
    contexts: ["selection"] // Only show when text is selected
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "readWithReadster") {
    const data = {
      text: info.selectionText || null,
      timestamp: Date.now()
    };
    
    // Save to local storage for the content script to pick up
    chrome.storage.local.set({ "readster_pending_data": data }, () => {
      // Open the /read route specifically so the Reader component is mounted
      const targetUrl = READSTER_URL.endsWith('/') ? READSTER_URL + 'read' : READSTER_URL + '/read';
      chrome.tabs.create({ url: targetUrl });
    });
  }
});
